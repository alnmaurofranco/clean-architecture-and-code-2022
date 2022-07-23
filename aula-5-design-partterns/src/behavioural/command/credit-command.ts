import { Account } from "./account";
import { Command } from "./command";

export class CreditCommand implements Command {
  operation: string;

  constructor(readonly account: Account, readonly amount: number) {
    this.operation = "credit";
  }

  execute(): void {
    this.account.credit(this.amount);
  }
}
