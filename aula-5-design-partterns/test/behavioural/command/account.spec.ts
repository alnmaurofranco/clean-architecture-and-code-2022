import { Account } from "../../../src/behavioural/command/account";
import { CreditCommand } from "../../../src/behavioural/command/credit-command";
import { DebitCommand } from "../../../src/behavioural/command/debit-command";

test("Deve criar uma conta", () => {
  const account = new Account();
  const balance = account.getBalance();
  expect(balance).toBe(0);
});

test("Deve creditar uma conta", () => {
  const account = new Account();
  account.credit(100);
  const balance = account.getBalance();
  expect(balance).toBe(100);
});

test("Deve creditar uma conta", () => {
  const account = new Account();
  account.credit(100);
  account.debit(50);
  const balance = account.getBalance();
  expect(balance).toBe(50);
});

test("Deve creditar uma conta usando um comando", () => {
  const account = new Account();
  const creditCommand = new CreditCommand(account, 100);
  creditCommand.execute();
  const balance = account.getBalance();
  expect(balance).toBe(100);
});

test("Deve debitar uma conta usando um comando", () => {
  const account = new Account();
  const creditCommand = new CreditCommand(account, 100);
  creditCommand.execute();
  const debitCommand = new DebitCommand(account, 50);
  debitCommand.execute();
  const balance = account.getBalance();
  expect(balance).toBe(50);
});
