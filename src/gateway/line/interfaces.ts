import { ClientConfig } from '@line/bot-sdk';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface LineModuleOptions extends ClientConfig {
  global?: boolean;
  path: string;
}

export interface AsyncLineModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => ClientConfig | Promise<ClientConfig>;
  inject: FactoryProvider['inject'];
  global?: boolean;
  path: string;
}
