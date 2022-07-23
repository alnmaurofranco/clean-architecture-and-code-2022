import { Account } from "./account";
import { Command } from "./command";

export class DebitCommand implements Command {
  operation: string;

  constructor(readonly account: Account, readonly amount: number) {
    this.operation = "debit";
  }

  execute(): void {
    this.account.debit(this.amount);
  }
}
