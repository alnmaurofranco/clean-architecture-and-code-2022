import { Atm } from "../../../src/behavioural/chain_of_responsability/atm";

test("Deve sacar dinheiro do caixa eletronico", () => {
  const atm = new Atm();
  const bills = atm.withdraw(978);
  expect(bills).toStrictEqual([
    { type: 100, quantity: 9 },
    { type: 50, quantity: 1 },
    { type: 20, quantity: 1 },
    { type: 10, quantity: 0 },
    { type: 5, quantity: 1 },
    { type: 1, quantity: 3 },
  ]);
});
