export interface ICommandHandler<
  TCommand extends ICommand = any,
  TResult = any
> {
  handle: (command: TCommand) => TResult | Promise<TResult>;
}

export interface ICommand {}
