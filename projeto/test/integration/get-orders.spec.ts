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
import { GetOrderUseCase } from "../../src/application/use-cases/get-order/get-order-use-case";

let placeOrder: PlaceOrder;
let getOrders: GetOrdersUseCase;

beforeEach(() => {
  const repositoryFactory = new PrismaRepositoryFactory();
  // const repositoryFactory = new InMemoryRepositoryFactory();
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrders = new GetOrdersUseCase(repositoryFactory);
});

test("Deve obter todos os pedidos", async () => {
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
  await placeOrder.execute(input);
  const getOrdersOutput = await getOrders.execute();
  expect(getOrdersOutput.orders).toHaveLength(1);
});

afterEach(async () => {
  const prisma = new PrismaConnectionAdapter();
  await prisma.connection.$executeRaw`DELETE FROM order_items`;
  await prisma.connection.$executeRaw`DELETE FROM orders`;
  await prisma.connection.$disconnect();
});
