import { Module } from '@nestjs/common';
import { CommandModule } from '../command/command.module';
import { MessageService } from './message.service';

@Module({
  imports: [CommandModule],
  providers: [MessageService],
})
export class MessageModule {}
