import 'reflect-metadata';
import { ICommand } from './interfaces';
import { COMMAND_HANDLER_METADATA } from './constants';

export const CommandHandler = (command: ICommand): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
};
