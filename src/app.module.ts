import { Module } from '@nestjs/common';
import { PollutionModule } from './pollution/pollution.module';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PollutionModule,
    LineModule,
  ],
})
export class AppModule {}
