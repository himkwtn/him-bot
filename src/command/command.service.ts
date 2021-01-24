import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { COMMAND_HANDLER_METADATA } from './constants';
import { ICommand, ICommandHandler } from './interfaces';

export type CommandHandlerType = Type<ICommandHandler<ICommand>>;

@Injectable()
export class CommandService {
  private readonly handlers = new Map<string, ICommandHandler>();
  constructor(private readonly moduleRef: ModuleRef) {}

  handle(command: ICommand) {
    const commandName = this.getCommandName(command as any);
    const handler = this.handlers.get(commandName);
    return handler.handle(command);
  }
  register(handlers: CommandHandlerType[] = []) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  protected registerHandler(handler: CommandHandlerType) {
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }
    const target = this.reflectCommandName(handler);
    if (!target) {
      throw new Error();
    }
    this.handlers.set(target.name, instance as ICommandHandler);
  }

  private getCommandName(command: Function): string {
    const { constructor } = Object.getPrototypeOf(command);
    return constructor.name as string;
  }

  private reflectCommandName(handler: CommandHandlerType): FunctionConstructor {
    return Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
  }
}
