import { Channel } from '../gateway/channel';

export class IncomingTextMessageEvent {
  constructor(
    public readonly text: string,
    public readonly channelId: string,
    public readonly channel: Channel,
    public readonly metadata?: any,
  ) {}
}

export class ReplyTextMessageEvent {
  constructor(
    public readonly text: string,
    public readonly channelId: string,
    public readonly channel: Channel,
    public readonly metadata?: any,
  ) {}
}
