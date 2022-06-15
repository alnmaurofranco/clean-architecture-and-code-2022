import { StripeTransaction } from "./stripe-transaction";
import { Transaction } from "./transaction.interface";

export class StripeTransactionAdapter implements Transaction {
  trackNumber: string;
  amount: number;
  status: string;

  constructor(stripeTransaction: StripeTransaction) {
    this.trackNumber = stripeTransaction.code;
    this.amount = stripeTransaction.grossAmount;
    this.status = this.convertStatus(stripeTransaction.situation);
  }

  convertStatus(situation: number): string {
    const map: any = {
      1: "waiting_payment",
      2: "paid",
      3: "cancelled",
    };
    return map[situation];
  }
}
