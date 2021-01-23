import { Client } from '@line/bot-sdk';
import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { EventEmitter2 } from 'eventemitter2';
import { LINE_ACCESS_TOKEN, LINE_SECRET } from './constants';
import { AsyncLineModuleOptions, LineModuleOptions } from './interfaces';
import { LineEventSubscribersLoader } from './line-event-subscribers.loader';
import { LineEventsMetadataAccessor } from './line-events-metadata.accessor';
import { LineGatewayController } from './line.controller';
import { RouterModule } from 'nest-router';

@Module({})
export class LineGatewayModule {
  static forRoot(options: LineModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: LineGatewayModule,
      imports: [
        DiscoveryModule,
        RouterModule.forRoutes([
          { path: options.path, module: LineGatewayModule },
        ]),
      ],
      providers: [
        LineEventsMetadataAccessor,
        LineEventSubscribersLoader,
        {
          provide: Client,
          useValue: new Client(options),
        },
        {
          provide: LINE_ACCESS_TOKEN,
          useValue: options.channelAccessToken,
        },
        {
          provide: LINE_SECRET,
          useValue: options.channelSecret,
        },
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2(),
        },
      ],
      controllers: [LineGatewayController],
      exports: [Client],
    };
  }
  static forRootAsync(options: AsyncLineModuleOptions): DynamicModule {
    return {
      global: options?.global ?? true,
      module: LineGatewayModule,
      imports: [
        DiscoveryModule,
        RouterModule.forRoutes([
          { path: options.path, module: LineGatewayModule },
        ]),
        ...options.imports,
      ],
      providers: [
        LineEventsMetadataAccessor,
        LineEventSubscribersLoader,
        {
          provide: Client,
          useFactory: async (...args) => {
            const resolvedOptions = await options.useFactory(...args);
            return new Client(resolvedOptions);
          },
          inject: options.inject,
        },
        {
          provide: LINE_ACCESS_TOKEN,
          useFactory: async (...args: any[]) => {
            const resolvedOptions = await options.useFactory(...args);
            return resolvedOptions.channelAccessToken;
          },
          inject: options.inject,
        },
        {
          provide: LINE_SECRET,
          useFactory: async (...args: any[]) => {
            const resolvedOptions = await options.useFactory(...args);
            return resolvedOptions.channelSecret;
          },
          inject: options.inject,
        },
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2(),
        },
      ],
      controllers: [LineGatewayController],
      exports: [Client],
    };
  }
}
