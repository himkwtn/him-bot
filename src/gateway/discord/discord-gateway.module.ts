import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DISCORD_TOKEN } from './constants';
import { DiscordEventSubscribersLoader } from './discord-event-subscribers.loader';
import { DiscordEventsMetadataAccessor } from './discord-events-metadata.accessor';
import { DiscordClient } from './discord.client';
import { AsyncDiscordModuleOptions, DiscordModuleOptions } from './interfaces';

@Module({})
export class DiscordGatewayModule {
  static forRoot(options: DiscordModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: DiscordGatewayModule,
      imports: [DiscoveryModule],
      providers: [
        DiscordEventSubscribersLoader,
        DiscordEventsMetadataAccessor,
        {
          provide: DiscordClient,
          useValue: new DiscordClient(options),
        },
        {
          provide: DISCORD_TOKEN,
          useValue: options.token,
        },
      ],
      exports: [DiscordClient],
    };
  }
  static forRootAsync(options: AsyncDiscordModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: DiscordGatewayModule,
      imports: [DiscoveryModule, ...options.imports],
      providers: [
        DiscordEventSubscribersLoader,
        DiscordEventsMetadataAccessor,
        {
          provide: DiscordClient,
          useFactory: async (...args) => {
            const resolvedOptions = await options.useFactory(...args);
            return new DiscordClient(resolvedOptions);
          },
          inject: options.inject,
        },
        {
          provide: DISCORD_TOKEN,
          useFactory: async (...args: any[]) => {
            const resolvedOptions = await options.useFactory(...args);
            return resolvedOptions.token;
          },
          inject: options.inject,
        },
      ],
      exports: [DiscordClient],
    };
  }
}
