import { Module } from '@nestjs/common';
import { PollutionModule } from './pollution/pollution.module';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommandModule } from './command/command.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PollutionModule,
    LineModule,
    GatewayModule,
    CommandModule,
    MessageModule,
  ],
  providers: [AppService],
})
export class AppModule {}
