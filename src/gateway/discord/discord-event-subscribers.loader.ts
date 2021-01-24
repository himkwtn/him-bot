import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { DISCORD_TOKEN } from './constants';
import { DiscordEventsMetadataAccessor } from './discord-events-metadata.accessor';
import { DiscordClient } from './discord.client';

@Injectable()
export class DiscordEventSubscribersLoader
  implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly client: DiscordClient,
    private readonly metadataAccessor: DiscordEventsMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
    @Inject(DISCORD_TOKEN) private readonly token: string,
  ) {}

  onApplicationBootstrap() {
    this.loadEventListeners();
    this.login();
  }

  onApplicationShutdown() {
    this.client.destroy();
  }

  login() {
    this.client.login(this.token);
  }

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
    const onEventListenerMetadata = this.metadataAccessor.getDiscordOnEventHandlerMetadata(
      instance[methodKey],
    );
    if (onEventListenerMetadata) {
      const { event } = onEventListenerMetadata;
      return this.client.on(event, (...args: unknown[]) =>
        instance[methodKey].call(instance, ...args),
      );
    }
    const onceEventListenerMetadata = this.metadataAccessor.getDiscordOnceEventHandlerMetadata(
      instance[methodKey],
    );
    if (onceEventListenerMetadata) {
      const { event } = onceEventListenerMetadata;
      return this.client.once(event, (...args: unknown[]) =>
        instance[methodKey].call(instance, ...args),
      );
    }
  }
}
