import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Message, TextChannel } from 'discord.js';
import { EventEmitter2 } from 'eventemitter2';
import {
  IncomingTextMessageEvent,
  ReplyTextMessageEvent,
} from '../events/message.event';
import { Channel } from './channel';
import { DiscordService } from './discord.service';
import { DiscordOnEvent } from './discord/discord.decorator';

@Injectable()
export class GatewayService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly discordService: DiscordService,
  ) {}

  @OnEvent(ReplyTextMessageEvent.name)
  replyMessage(event: ReplyTextMessageEvent) {
    switch (event.channel) {
      case Channel.discord: {
        this.discordService.sendMessage(event.text, event.channelId);
      }
    }
  }

  @DiscordOnEvent('message')
  discord(message: Message) {
    if (message.author.bot) {
      return;
    }
    this.eventEmitter.emit(
      IncomingTextMessageEvent.name,
      new IncomingTextMessageEvent(
        message.content,
        message.channel.id,
        Channel.discord,
      ),
    );
  }
}
