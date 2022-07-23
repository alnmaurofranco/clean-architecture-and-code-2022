export class Account {
  balance: number;

  constructor() {
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount: number) {
    this.balance += amount;
  }

  debit(amount: number) {
    this.balance -= amount;
  }
}
