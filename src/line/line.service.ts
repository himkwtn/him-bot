import { LineClient } from '../gateway/line/line.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineService {
  constructor(private readonly client: LineClient) {}

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
