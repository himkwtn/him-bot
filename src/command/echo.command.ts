import { CommandHandler } from './command.decorator';
import { ICommandHandler } from './interfaces';

export class EchoCommand {
  constructor(public readonly message: string) {}
}

@CommandHandler(EchoCommand)
export class EchoCommandHandler implements ICommandHandler<EchoCommand> {
  handle(command: EchoCommand) {
    return command.message;
  }
}
