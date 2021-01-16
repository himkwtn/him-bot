import { Client } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineClient {
  private readonly client: Client;
  constructor(private readonly config: ConfigService) {
    this.client = new Client({
      channelAccessToken: config.get('LINE_TOKEN'),
      channelSecret: config.get('LINE_SECRET'),
    });
  }

  pushTextMessage(
    to: string,
    text: string,
    sender?: { name: string; iconUrl: string },
  ) {
    return this.client.pushMessage(to, { type: 'text', text, sender });
  }

  replyTextMessage(replyToken: string, text: string | string[]) {
    if (typeof text === 'string') {
      return this.client.replyMessage(replyToken, { type: 'text', text });
    } else {
      return this.client.replyMessage(
        replyToken,
        text.map(t => ({ type: 'text', text: t })),
      );
    }
  }

  getGroupSummary(groupId: string) {
    return this.client.getGroupSummary(groupId);
  }
}
