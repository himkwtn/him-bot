import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CommandService } from '../command/command.service';
import { EchoCommand } from '../command/echo.command';
import { PingCommand } from '../command/ping.command';
import {
  IncomingTextMessageEvent,
  ReplyTextMessageEvent,
} from '../events/message.event';
import { BotCommand } from 'bot-commander';
import { ICommand } from '../command/interfaces';
import { checkMessagePrefix } from './utils';

@Injectable()
export class MessageService {
  constructor(
    private readonly commandService: CommandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @OnEvent(IncomingTextMessageEvent.name)
  async handleIncomingTextMessage(event: IncomingTextMessageEvent) {
    try {
      const message = checkMessagePrefix('keqing', event.text);
      const bot = new BotCommand();
      let command: ICommand;
      bot.command('ping').action(() => {
        command = new PingCommand();
      });
      bot.command('echo [messages...]').action((_: any, messages: string[]) => {
        command = new EchoCommand(messages.join(' '));
      });
      bot.parse(message);
      const response = await this.commandService.handle(command);
      return this.eventEmitter.emit(
        ReplyTextMessageEvent.name,
        new ReplyTextMessageEvent(response, event.channelId, event.channel),
      );
    } catch {}
  }
}
