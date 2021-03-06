import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordGatewayModule } from './discord/discord-gateway.module';
import { LineGatewayModule } from './line/line-gateway.module';
import { GatewayService } from './gateway.service';
import { DiscordService } from './discord.service';

@Module({
  imports: [
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
  providers: [GatewayService, DiscordService],
})
export class GatewayModule {}
