import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LINE_ON_EVENT_LISTENER_METADATA } from './constants';
import { LineOnEventMetadata } from './line.decorator';

@Injectable()
export class LineEventsMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getLineOnEventHandlerMetadata(
    target: Type<unknown>,
  ): LineOnEventMetadata | undefined {
    return this.reflector.get(LINE_ON_EVENT_LISTENER_METADATA, target);
  }
}
