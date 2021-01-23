import { Module } from '@nestjs/common';
import { PollutionModule } from './pollution/pollution.module';
import { LineModule } from './line/line.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscordGatewayModule } from './gateway/discord/discord-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PollutionModule,
    LineModule,
    DiscordGatewayModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          token: configService.get<string>('DISCORD_TOKEN'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
