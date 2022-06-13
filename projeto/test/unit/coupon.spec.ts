import { Coupon } from "../../src/domain/entity/coupon";

test("Deve criar um cupom de desconto válido", () => {
  const coupon = new Coupon("VALE5", 5, new Date("2022-06-31"));
  const today = new Date("2022-05-31");
  const isValid = coupon.isValid(today);
  expect(isValid).toBeTruthy();
});

test("Deve criar um cupom de desconto expirado", () => {
  const coupon = new Coupon("VALE5", 5, new Date("2022-01-18"));
  const today = new Date("2022-06-01");
  const isExpired = coupon.isExpired(today);
  expect(isExpired).toBeTruthy();
});

test("Deve criar um cupom de desconto válido e calcular o desconto", () => {
  const coupon = new Coupon("VALE5", 5);
  const discount = coupon.calculateDiscount(1000);
  expect(discount).toBe(50);
});
