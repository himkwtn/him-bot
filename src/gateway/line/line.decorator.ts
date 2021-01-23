import { SetMetadata } from '@nestjs/common';
import { LINE_ON_EVENT_LISTENER_METADATA } from './constants';

/**
 * `@OnEvent` decorator metadata
 */
export interface LineOnEventMetadata {
  /**
   * Event (name) to subscribe to.
   */
  event: string;
}

/**
 * Event listener decorator.
 * Subscribes to events based on the specified name(s).
 *
 * @param name event to subscribe to
 */
export const LineOnEvent = (event: string): MethodDecorator =>
  SetMetadata(LINE_ON_EVENT_LISTENER_METADATA, {
    event,
  } as LineOnEventMetadata);
