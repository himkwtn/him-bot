import { Module } from '@nestjs/common';
import { PollutionModule } from './pollution/pollution.module';
import { LineModule } from './line/line.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscordGatewayModule } from './gateway/discord/discord-gateway.module';
import { LineGatewayModule } from './gateway/line/line-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PollutionModule,
    LineModule,
    LineGatewayModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          channelAccessToken: configService.get<string>('LINE_ACCESS_TOKEN'),
          channelSecret: configService.get<string>('LINE_SECRET'),
        };
      },
      path: 'line',
      inject: [ConfigService],
    }),
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
