import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { Client } from 'discord.js';
import { DiscordEventSubscribersLoader } from './discord-event-subscribers.loader';
import { DiscordEventsMetadataAccessor } from './discord-events-metadata.accessor';
import { AsyncDiscordModuleOptions, DiscordModuleOptions } from './interfaces';
import { DISCORD_TOKEN } from './constants';

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
          provide: Client,
          useValue: new Client(options),
        },
        {
          provide: DISCORD_TOKEN,
          useValue: options.token,
        },
      ],
      exports: [Client],
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
          provide: Client,
          useFactory: async (...args) => {
            const resolvedOptions = await options.useFactory(...args);
            return new Client(resolvedOptions);
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
      exports: [Client],
    };
  }
}
