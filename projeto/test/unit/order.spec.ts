import { compileFunction } from "vm";
import { Coupon } from "../../src/domain/entity/coupon";
import { Item } from "../../src/domain/entity/item";
import { Order } from "../../src/domain/entity/order";
import { DefaultFreightCalculator } from "../../src/domain/entity/default-freight-calculator";
import { FixedFreightCalculator } from "../../src/domain/entity/fixed-freight-calculator";

test("Deve criar um pedido vazio com CPF válido", () => {
  // const createCPF = new CPF();
  const order = new Order("839.435.452-10");
  const total = order.getTotal();
  expect(total).toBe(0);
});

test("Deve tentar criar um pedido vazio com CPF inválido", () => {
  // const createCPF = new CPF();
  expect(() => new Order("000.000.000-00")).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido com 3 itens", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Café", "Melita", 13), 2);
  order.addItem(new Item(2, "Leite", "Parmalat", 5), 2);
  order.addItem(new Item(3, "Acuçar", "Barra", 3), 1);
  const total = order.getTotal();
  expect(total).toBe(39);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto de 5%", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Café", "Melita", 13), 2);
  order.addItem(new Item(2, "Leite", "Parmalat", 5), 2);
  order.addItem(new Item(3, "Acuçar", "Barra", 3), 1);
  order.addItem(new Item(4, "Sacola", "Mercado", 1), 1);
  order.addCoupon(new Coupon("VALE5", 5));
  const total = order.getTotal();
  expect(total).toBe(38);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto expirado", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date("2022-06-01"));
  order.addItem(new Item(1, "Café", "Melita", 13), 2);
  order.addItem(new Item(2, "Leite", "Parmalat", 5), 2);
  order.addItem(new Item(3, "Acuçar", "Barra", 3), 1);
  order.addItem(new Item(4, "Sacola", "Mercado", 1), 1);
  order.addCoupon(new Coupon("VALE5", 5, new Date("2022-05-18")));
  const total = order.getTotal();
  expect(total).toBe(40);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete padrão", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
  order.addItem(new Item(5, "Sucrilhos", "Nescau", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(6, "Sucrilhos", "Kellogrs", 5000, 100, 50, 50, 2), 1);
  order.addItem(
    new Item(7, "Sucrilhos", "Chocobolinha", 30, 10, 10, 10, 0.9),
    3
  );
  const freight = order.getFreight();
  expect(freight).toBe(80);
});

test("Deve criar um pedido com 3 itens com o cálculo do frete fixado com um valor", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(5, "Sucrilhos", "Nescau", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(6, "Sucrilhos", "Kellogrs", 5000, 100, 50, 50, 2), 1);
  order.addItem(
    new Item(7, "Sucrilhos", "Chocobolinha", 30, 10, 10, 10, 0.9),
    3
  );
  const freight = order.getFreight();
  expect(freight).toBe(50);
});

test("Deve criar um pedido com código", () => {
  const cpf = "839.435.452-10";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(5, "Sucrilhos", "Nescau", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(6, "Sucrilhos", "Kellogrs", 5000, 100, 50, 50, 2), 1);
  order.addItem(
    new Item(7, "Sucrilhos", "Chocobolinha", 30, 10, 10, 10, 0.9),
    3
  );
  const code = order.getCode();
  expect(code).toBe("202200000001");
});
