import { SetMetadata } from '@nestjs/common';
import { ClientEvents } from 'discord.js';
import {
  DISCORD_ONCE_EVENT_LISTENER_METADATA,
  DISCORD_ON_EVENT_LISTENER_METADATA,
} from './constants';

/**
 * `@OnEvent` decorator metadata
 */
export interface DiscordOnEventMetadata {
  /**
   * Event (name) to subscribe to.
   */
  event: keyof ClientEvents;
}

export type DiscordOnceEventMetadata = DiscordOnEventMetadata;
/**
 * Event listener decorator.
 * Subscribes to events based on the specified name(s).
 *
 * @param name event to subscribe to
 */
export const DiscordOnEvent = (event: keyof ClientEvents): MethodDecorator =>
  SetMetadata(DISCORD_ON_EVENT_LISTENER_METADATA, {
    event,
  } as DiscordOnEventMetadata);

export const DiscordOnceEvent = (event: keyof ClientEvents): MethodDecorator =>
  SetMetadata(DISCORD_ONCE_EVENT_LISTENER_METADATA, {
    event,
  } as DiscordOnceEventMetadata);
