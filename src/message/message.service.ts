import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CommandService } from '../command/command.service';
import { PingCommand } from '../command/ping.command';
import {
  IncomingTextMessageEvent,
  ReplyTextMessageEvent,
} from '../events/message.event';

@Injectable()
export class MessageService {
  constructor(
    private readonly commandService: CommandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @OnEvent(IncomingTextMessageEvent.name)
  handleIncomingTextMessage(event: IncomingTextMessageEvent) {
    console.log(event);
    if (event.text === '!ping') {
      const response = this.commandService.handle(new PingCommand());
      this.eventEmitter.emit(
        ReplyTextMessageEvent.name,
        new ReplyTextMessageEvent(response, event.channelId, event.channel),
      );
    }
  }
}
