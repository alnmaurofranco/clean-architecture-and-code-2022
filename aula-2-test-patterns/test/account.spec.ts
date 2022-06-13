import { Account } from "../src/account";
import { CurrencyAPI } from "../src/currency-api";
import { CurrencyAPIFakeInMemory } from "../src/currency-api-fake-in-memory";
import sinon from "sinon";

let currencyAPI: CurrencyAPI;
let account: Account;

beforeEach(() => {
  currencyAPI = new CurrencyAPIFakeInMemory();
  account = new Account(currencyAPI);
});

test("Deve criar uma conta", () => {
  // given => dado
  const balance = account.getBalance(); // when => quando
  expect(balance).toBe(0); // then => então
});

test("Deve criar um novo crédito de R$ 200,00", () => {
  account.credit(200);
  const balance = account.getBalance();
  expect(balance).toBe(200);
});

test("Deve fazer um débito de R$ 100,00", () => {
  account.credit(200);
  account.debit(100);
  const balance = account.getBalance();
  expect(balance).toBe(100);
});

test("Deve fazer um crédito de $100,00 com Fake (InMemory)", () => {
  account.credit(200, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(1000);
});

test("Deve fazer um crédito de $100,00 com Stub", () => {
  sinon.stub(currencyAPI, "convert").returns(400);
  account.credit(200, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(400);
});

test("Deve fazer um crédito de $100,00 com Spy chamando a função pelo menos 1 vez", () => {
  const spyBalance = sinon.spy(account, "getBalance");
  account.getBalance();
  sinon.assert.calledOnce(spyBalance);
});

test("Deve fazer um crédito de $100,00 com Spy chamando a função 3 vezes", () => {
  const spyBalance = sinon.spy(account, "getBalance");
  account.getBalance();
  account.getBalance();
  account.getBalance();
  sinon.assert.calledThrice(spyBalance);
});

test("Deve fazer um crédito de $100,00 com Mock", () => {
  const mock = sinon.mock(account);
  mock.expects("credit").once().withArgs(100, "USD");
  mock.expects("getBalance").once().returns(200);
  account.credit(100, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(200);
  mock.verify();
});
