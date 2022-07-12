import axios from "axios";
import { GetOrdersUseCase } from "../../src/application/use-cases/get-orders/get-orders-use-case";
import { PlaceOrder } from "../../src/application/use-cases/place-order/place-order";
import { PrismaConnectionAdapter } from "../../src/infra/database/prisma-connection-adapter";
import { PrismaRepositoryFactory } from "../../src/infra/factory/prisma-repository-factory";

let placeOrder: PlaceOrder;
let repositoryFactory: PrismaRepositoryFactory;

beforeEach(() => {
  repositoryFactory = new PrismaRepositoryFactory();
  placeOrder = new PlaceOrder(repositoryFactory);
});

test.skip("Deve testar a API /oders (POST) ", async () => {
  const response = await axios.post("http://localhost:3333/orders", {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
    coupon: "VALE5",
  });

  const order = response.data;
  expect(order.total).toBe(75.65);
});

test.skip("Deve testar a API /simulate-freight (POST) ", async () => {
  const response = await axios.post("http://localhost:3333/simulate-freight", {
    items: [
      {
        idItem: 4,
        quantity: 1,
      },
      {
        idItem: 5,
        quantity: 1,
      },
      {
        idItem: 6,
        quantity: 3,
      },
    ],
  });

  const simulateFreight = response.data;
  expect(simulateFreight.amount).toBe(80);
});

test("Deve testar a API /orders (GET) ", async () => {
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
  const response = await axios.get("http://localhost:3333/orders");
  const orders = response.data;
  console.log(orders);
});

afterEach(async () => {
  const prisma = new PrismaConnectionAdapter();
  await prisma.connection.$executeRaw`DELETE FROM order_items`;
  await prisma.connection.$executeRaw`DELETE FROM orders`;
  await prisma.connection.$disconnect();
});
