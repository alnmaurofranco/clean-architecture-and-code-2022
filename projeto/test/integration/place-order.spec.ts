import { PlaceOrder } from "../../src/application/use-cases/place-order/place-order";
import { ItemsRepositoryInMemory } from "../../src/infra/repository/in-memory/items-repository-in-memory";
import { CouponsRepositoryInMemory } from "../../src/infra/repository/in-memory/coupons-repository-in-memory";
import { OrdersRepositoryInMemory } from "../../src/infra/repository/in-memory/orders-repository-in-memory";
import { PlaceOrderInput } from "../../src/application/use-cases/place-order/place-order-input";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/pg-promise-connection-adapter";
import { ItemsRepositoryDatabase } from "../../src/infra/repository/database/items-repository-database";
import { ItemsRepositoryPrisma } from "../../src/infra/repository/database/items-repository-prisma";
import { CouponsRepositoryPrisma } from "../../src/infra/repository/database/coupons-repository-prisma";
import { OrdersRepositoryPrisma } from "../../src/infra/repository/database/orders-repository-prisma";
import { PrismaConnectionAdapter } from "../../src/infra/database/prisma-connection-adapter";
import { PrismaRepositoryFactory } from "../../src/infra/factory/prisma-repository-factory";
import { InMemoryRepositoryFactory } from "../../src/infra/factory/in-memory-repository-factory";
import { GetStockUseCase } from "../../src/application/use-cases/get-stock/get-stock-use-case";
import { Broker } from "../../src/infra/broker/broker";
import { OrderPlacedStockHandler } from "../../src/application/handler/order-placed-stock-handler";

let placeOrder: PlaceOrder;
let getStock: GetStockUseCase;

beforeEach(() => {
  // const repositoryFactory = new PrismaRepositoryFactory();
  const repositoryFactory = new InMemoryRepositoryFactory();
  const broker = new Broker();
  const orderPlacedStockHandler = new OrderPlacedStockHandler(
    repositoryFactory
  );
  broker.register(orderPlacedStockHandler);
  getStock = new GetStockUseCase(repositoryFactory);
  placeOrder = new PlaceOrder(repositoryFactory, broker);
});

test("Deve fazer um pedido", async () => {
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
  expect(output.total).toBe(75.65);
});

test("Deve fazer um pedido com cálculo de frete", async () => {
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

test("Deve fazer um pedido e retirar do estoque", async () => {
  // Request/Input/DTO (Dados de entrada) - Dados de entrada
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
  };
  // Response/Output (Dados de saída)
  const placeOrderOutput = await placeOrder.execute(input);
  const totalA = await getStock.execute(1);
  const totalB = await getStock.execute(2);
  const totalC = await getStock.execute(3);
  expect(totalA).toBe(0);
  expect(totalB).toBe(0);
  expect(totalC).toBe(0);
});

afterEach(async () => {
  const prisma = new PrismaConnectionAdapter();
  await prisma.connection.$executeRaw`DELETE FROM order_items`;
  await prisma.connection.$executeRaw`DELETE FROM orders`;
  await prisma.connection.$disconnect();
});
