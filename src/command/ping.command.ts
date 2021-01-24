import { CommandHandler } from './command.decorator';
import { ICommandHandler } from './interfaces';

export class PingCommand {}

@CommandHandler(PingCommand)
export class PingCommandHandler implements ICommandHandler<PingCommand> {
  constructor() {}

  handle() {
    return 'pong';
  }
}
