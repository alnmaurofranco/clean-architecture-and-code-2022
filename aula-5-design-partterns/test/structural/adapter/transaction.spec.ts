import { PayPalTransaction } from "../../../src/structural/adapter/paypal-transaction";
import { PayPalTransactionAdapter } from "../../../src/structural/adapter/paypal-transaction-adapter";
import { StripeTransaction } from "../../../src/structural/adapter/stripe-transaction";
import { StripeTransactionAdapter } from "../../../src/structural/adapter/stripe-transaction-adapter";

test("Deve criar uma transação do Stripe", () => {
  const stripeTransaction = new StripeTransaction("AHN78", 1000, 2);
  expect(stripeTransaction.code).toBe("AHN78");
});

test("Deve criar uma transação com PayPal", () => {
  const paypalTransaction = new PayPalTransaction(12123459, 1000, "200");
  expect(paypalTransaction.id).toBe(12123459);
});

test("Deve criar uma transção a partir do Stripe", () => {
  const stripeTransaction = new StripeTransaction("AHN78", 1000, 2);
  const transaction = new StripeTransactionAdapter(stripeTransaction);
  expect(transaction.trackNumber).toBe("AHN78");
  expect(transaction.amount).toBe(1000);
  expect(transaction.status).toBe("paid");
});

test("Deve criar uma transção a partir do PayPal", () => {
  const paypalTransaction = new PayPalTransaction(12123459, 1000, "P");
  const transaction = new PayPalTransactionAdapter(paypalTransaction);
  expect(transaction.trackNumber).toBe("12123459");
  expect(transaction.amount).toBe(1000);
  expect(transaction.status).toBe("paid");
});
