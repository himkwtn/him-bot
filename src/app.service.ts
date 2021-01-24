import { MessageEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import {
  DiscordOnceEvent,
  DiscordOnEvent,
} from './gateway/discord/discord.decorator';
import { LineOnEvent } from './gateway/line/line.decorator';
import { LineService } from './line/line.service';

@Injectable()
export class AppService {
  constructor(private readonly client: LineService) {}
  @DiscordOnceEvent('ready')
  ready() {
    console.log('ready!');
  }

  @DiscordOnEvent('message')
  discordPong(message: Message) {
    console.log(message);
    console.log(message.channel.id);
    const { content } = message;
    if (content === '!ping') message.channel.send('Pong.');
    if (content === '!hello') message.channel.send('world');
    console.log(message.content);
  }

  @LineOnEvent('message')
  linePong(event: MessageEvent) {
    console.log(event);
    if (event.message.type === 'text' && event.message.text === '!ping')
      this.client.replyTextMessage(event.replyToken, 'pong');
  }
}
