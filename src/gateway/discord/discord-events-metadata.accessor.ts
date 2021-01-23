import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  DISCORD_ONCE_EVENT_LISTENER_METADATA,
  DISCORD_ON_EVENT_LISTENER_METADATA,
} from './constants';
import {
  DiscordOnceEventMetadata,
  DiscordOnEventMetadata,
} from './discord.decorator';

@Injectable()
export class DiscordEventsMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getDiscordOnEventHandlerMetadata(
    target: Type<unknown>,
  ): DiscordOnEventMetadata | undefined {
    return this.reflector.get(DISCORD_ON_EVENT_LISTENER_METADATA, target);
  }

  getDiscordOnceEventHandlerMetadata(
    target: Type<unknown>,
  ): DiscordOnceEventMetadata | undefined {
    return this.reflector.get(DISCORD_ONCE_EVENT_LISTENER_METADATA, target);
  }
}
