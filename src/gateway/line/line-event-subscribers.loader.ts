import { Client } from '@line/bot-sdk';
import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { EventEmitter2 } from 'eventemitter2';
import { LINE_SECRET, LINE_ACCESS_TOKEN } from './constants';
import { LineEventsMetadataAccessor } from './line-events-metadata.accessor';

@Injectable()
export class LineEventSubscribersLoader
  implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly eventEmitter: EventEmitter2,
    private readonly metadataAccessor: LineEventsMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    this.loadEventListeners();
  }

  onApplicationShutdown() {}

  loadEventListeners() {
    const providers = this.discoveryService.getProviders();
    providers
      .filter(wrapper => wrapper.isDependencyTreeStatic())
      .filter(wrapper => wrapper.instance)
      .forEach((wrapper: InstanceWrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);
        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (methodKey: string) =>
            this.subscribeToEventIfListener(instance, methodKey),
        );
      });
  }

  private subscribeToEventIfListener(
    instance: Record<string, any>,
    methodKey: string,
  ) {
    const onEventListenerMetadata = this.metadataAccessor.getLineOnEventHandlerMetadata(
      instance[methodKey],
    );
    if (onEventListenerMetadata) {
      const { event } = onEventListenerMetadata;
      return this.eventEmitter.on(event, (...args: unknown[]) =>
        instance[methodKey].call(instance, ...args),
      );
    }
  }
}
