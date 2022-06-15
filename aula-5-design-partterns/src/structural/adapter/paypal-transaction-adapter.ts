import { PayPalTransaction } from "./paypal-transaction";
import { Transaction } from "./transaction.interface";

export class PayPalTransactionAdapter implements Transaction {
  trackNumber: string;
  amount: number;
  status: string;

  constructor(paypalTransaction: PayPalTransaction) {
    this.trackNumber = `${paypalTransaction.id}`;
    this.amount = paypalTransaction.amount;
    this.status = this.convertStatus(paypalTransaction.status);
  }

  convertStatus(status: string): string {
    const map: any = {
      S: "waiting_payment",
      P: "paid",
      C: "refounded",
    };
    return map[status];
  }
}
