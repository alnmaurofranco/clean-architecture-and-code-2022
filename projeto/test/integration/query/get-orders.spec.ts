import { GetOrders } from "../../../src/application/query/get-orders";
import { PlaceOrder } from "../../../src/application/use-cases/place-order/place-order";
import { OrderDAODatabase } from "../../../src/infra/dao/order-dao-database";
import { PgPromiseConnectionAdapter } from "../../../src/infra/database/pg-promise-connection-adapter";
import { PrismaConnectionAdapter } from "../../../src/infra/database/prisma-connection-adapter";
import { PrismaRepositoryFactory } from "../../../src/infra/factory/prisma-repository-factory";

let placeOrder: PlaceOrder;
let getOrders: GetOrders;

beforeEach(() => {
  const connection = new PrismaConnectionAdapter(); // PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new PrismaRepositoryFactory();
  const orderDAO = new OrderDAODatabase(connection);
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrders = new GetOrders(orderDAO);
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
  console.log(getOrdersOutput);
  expect(getOrdersOutput).toHaveLength(1);
});

afterEach(async () => {
  const prisma = new PrismaConnectionAdapter();
  await prisma.connection.$executeRawUnsafe("DELETE FROM order_items");
  await prisma.connection.$executeRawUnsafe("DELETE FROM orders");
  await prisma.connection.$disconnect();
});
