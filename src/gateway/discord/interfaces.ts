import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { ClientOptions } from 'discord.js';

export interface DiscordModuleOptions extends ClientOptions {
  token: string;
  global?: boolean;
}

export interface AsyncDiscordModuleConfig extends ClientOptions {
  token: string;
}

export interface AsyncDiscordModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => AsyncDiscordModuleConfig | Promise<AsyncDiscordModuleConfig>;
  inject: FactoryProvider['inject'];
  global?: boolean;
}
