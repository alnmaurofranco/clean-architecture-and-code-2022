export interface Command {
  operation: string;
  execute(): void;
}
