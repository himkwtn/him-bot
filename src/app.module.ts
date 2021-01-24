import { Module } from '@nestjs/common';
import { PollutionModule } from './pollution/pollution.module';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PollutionModule,
    LineModule,
    GatewayModule,
  ],
  providers: [AppService],
})
export class AppModule {}
