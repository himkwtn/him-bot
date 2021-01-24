import { Injectable } from '@nestjs/common';
import { DiscordClient } from './discord/discord.client';

@Injectable()
export class DiscordService {
  constructor(private readonly client: DiscordClient) {}
  async sendMessage(text: string, channelId: string) {
    const channel = await this.client.channels.fetch(channelId);
    if (channel.isText()) {
      channel.send(text);
    }
  }
}
