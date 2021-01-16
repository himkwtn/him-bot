import { WebhookRequestBody } from '@line/bot-sdk';
import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { inspect } from 'util';

@Controller('line')
export class LineController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  async webhook(
    @Body() message: WebhookRequestBody,
    @Headers('x-line-signature') lineSignature: string,
  ) {
    if (!this.verifySignature(message, lineSignature))
      throw new UnauthorizedException();
    console.log(inspect(message, true, null));
    return;
  }
  private verifySignature(message: WebhookRequestBody, lineSignature: string) {
    return this.getBodySignature(message) === lineSignature;
  }
  private getBodySignature(message: WebhookRequestBody) {
    return crypto
      .createHmac('SHA256', this.configService.get('LINE_SECRET'))
      .update(JSON.stringify(message))
      .digest('base64');
  }
}
