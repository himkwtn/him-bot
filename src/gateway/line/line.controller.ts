import { WebhookRequestBody } from '@line/bot-sdk';
import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { EventEmitter2 } from 'eventemitter2';
import { LINE_SECRET } from './constants';

@Controller()
export class LineGatewayController {
  constructor(
    @Inject(LINE_SECRET) private readonly secret: string,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async webhook(
    @Body() message: WebhookRequestBody,
    @Headers('x-line-signature') lineSignature: string,
  ) {
    if (!this.verifySignature(message, lineSignature))
      throw new UnauthorizedException();
    this.eventEmitter.emit('webhook', message);
    for (const event of message.events) {
      this.eventEmitter.emit(event.type, event);
    }
    return;
  }
  private verifySignature(message: WebhookRequestBody, lineSignature: string) {
    return this.getBodySignature(message) === lineSignature;
  }
  private getBodySignature(message: WebhookRequestBody) {
    return crypto
      .createHmac('SHA256', this.secret)
      .update(JSON.stringify(message))
      .digest('base64');
  }
}
