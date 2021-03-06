import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';
import { LineService } from '../line/line.service';
import { inspect } from 'util';
interface WeatherPayload {
  status: string;
  data: {
    city: string;
    state: string;
    country: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
    current: {
      weather: {
        ts: string;
        tp: number;
        pr: number;
        hu: number;
        ws: number;
        wd: number;
        ic: string;
      };
      pollution: {
        ts: string;
        aqius: number;
        mainus: 'p2';
        aqicn: number;
        maincn: 'p2';
      };
    };
  };
}
@Injectable()
export class PollutionService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
    private readonly lineService: LineService,
  ) {}

  getPollutionData() {
    const apiKey = this.config.get('AIR_VISUAL_API_KEY');
    const url = `http://api.airvisual.com/v2/city?city=Bang Na&state=Bangkok&country=Thailand&key=${apiKey}`;
    return this.http.get<WeatherPayload>(url).pipe(
      map(({ data }) => {
        const pollution = data.data.current.pollution;
        const time = DateTime.fromISO(pollution.ts)
          .setZone('Asia/Bangkok')
          .toLocaleString(DateTime.DATETIME_SHORT);
        const pm2 = pollution.aqius;
        return { time, pm2 };
      }),
    );
  }

  @Cron('1 7,8,9 * * *', {
    name: 'daily-message',
    timeZone: 'Asia/Bangkok',
  })
  async sendDailyMessage() {
    this.getPollutionData().subscribe(async data => {
      try {
        const message = `${data.pm2} US AQI
${data.time} `;
        await this.lineService.pushTextMessage(
          this.config.get('HOME_LINE_GROUP'),
          message,
          {
            name: 'PM 2.5',
            iconUrl: 'https://www.iqair.com/assets/img/app_icon_basic_96.png',
          },
        );
      } catch (e) {
        console.log(inspect(e, { depth: null }));
      }
    });
  }
}
