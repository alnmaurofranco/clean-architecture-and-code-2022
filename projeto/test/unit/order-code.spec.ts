import { OrderCode } from "../../src/domain/entity/order-code";

test("Deve criar um código de pedido", () => {
  const date = new Date("2021-10-01");
  const sequence = 1;
  const orderCode = new OrderCode(date, sequence);
  const result = orderCode.value;
  expect(result).toBe("202100000001");
});
