import { OrderItem } from "../../src/domain/entity/orderItems";

test("Deve criar um item do pedido", () => {
  const order = new OrderItem(1, 1000, 10);
  expect(order.getTotal()).toBe(10000);
});
