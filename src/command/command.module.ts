import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PingCommandHandler } from './ping.command';
import { CommandService } from './command.service';
import { CommandExplorer } from './command.explorer';
@Module({
  providers: [PingCommandHandler, CommandService, CommandExplorer],
  exports: [CommandService],
})
export class CommandModule implements OnApplicationBootstrap {
  constructor(
    private readonly commandExplorer: CommandExplorer,
    private readonly commandService: CommandService,
  ) {}
  onApplicationBootstrap() {
    const commands = this.commandExplorer.explore();
    this.commandService.register(commands);
  }
}
