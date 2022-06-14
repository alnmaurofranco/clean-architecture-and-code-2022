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

let placeOrder: PlaceOrder;

beforeEach(() => {
  // const itemsRepository = new ItemsRepositoryInMemory();
  // const connection = PgPromiseConnectionAdapter.getInstance();
  // const itemsRepository = new ItemsRepositoryDatabase(connection);
  // With PrismaORM
  const itemsRepository = new ItemsRepositoryPrisma();
  const couponsRepository = new CouponsRepositoryPrisma();
  const odersRepository = new OrdersRepositoryPrisma();
  placeOrder = new PlaceOrder(
    itemsRepository,
    odersRepository,
    couponsRepository
  );
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

afterEach(async () => {
  const prisma = new PrismaConnectionAdapter();
  await prisma.connection.$executeRaw`DELETE FROM order_items`;
  await prisma.connection.$executeRaw`DELETE FROM orders`;
  await prisma.connection.$disconnect();
});
