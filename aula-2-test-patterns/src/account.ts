import { CurrencyAPI } from "./currency-api";

export class Account {
  constructor(readonly currencyAPI: CurrencyAPI, private balance: number = 0) {}

  credit(amount: number, currency?: string) {
    if (currency) {
      amount = this.currencyAPI.convert(amount, currency);
    }
    this.balance += amount;
  }

  debit(amount: number) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      throw new Error("Saldo insuficiente");
    }
  }

  getBalance() {
    return this.balance;
  }
}
