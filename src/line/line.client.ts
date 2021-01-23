import { Client } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineClient {
  constructor(private readonly client: Client) {}

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
