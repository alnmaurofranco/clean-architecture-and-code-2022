import { PlaceOrder } from "../../src/application/use-cases/place-order";
import { ItemsRepositoryInMemory } from "../../src/infra/repository/in-memory/items-repository-in-memory";
import { CouponsRepositoryInMemory } from "../../src/infra/repository/in-memory/coupons-repository-in-memory";
import { OrdersRepositoryInMemory } from "../../src/infra/repository/in-memory/orders-repository-in-memory";
import { PlaceOrderInput } from "../../src/application/use-cases/place-order-input";

test("Deve fazer um pedido", async () => {
  const itemsRepository = new ItemsRepositoryInMemory();
  const couponsRepository = new CouponsRepositoryInMemory();
  const odersRepository = new OrdersRepositoryInMemory();
  const placeOrder = new PlaceOrder(
    itemsRepository,
    odersRepository,
    couponsRepository
  );
  // Request/Input/DTO (Dados de entrada) - Dados de entrada
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
    coupon: "VALE5",
  };
  // Response/Output (Dados de saída)
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(25.65);
});

test("Deve fazer um pedido com cálculo de frete", async () => {
  const itemsRepository = new ItemsRepositoryInMemory();
  const couponsRepository = new CouponsRepositoryInMemory();
  const odersRepository = new OrdersRepositoryInMemory();
  const placeOrder = new PlaceOrder(
    itemsRepository,
    odersRepository,
    couponsRepository
  );
  // Request/Input/DTO (Dados de entrada) - Dados de entrada
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
  };
  // Response/Output (Dados de saída)
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6170);
});

test("Deve fazer um pedido com código", async () => {
  const itemsRepository = new ItemsRepositoryInMemory();
  const couponsRepository = new CouponsRepositoryInMemory();
  const odersRepository = new OrdersRepositoryInMemory();
  const placeOrder = new PlaceOrder(
    itemsRepository,
    odersRepository,
    couponsRepository
  );
  // Request/Input/DTO (Dados de entrada) - Dados de entrada
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
  };
  // Response/Output (Dados de saída)
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202200000001");
});
