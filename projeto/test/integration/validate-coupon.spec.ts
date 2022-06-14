import { ValidateCouponUseCase } from "../../src/application/use-cases/validate-coupon/validate-coupon-use-case";
import { CouponsRepositoryPrisma } from "../../src/infra/repository/database/coupons-repository-prisma";

let validateCoupon: ValidateCouponUseCase;

beforeEach(() => {
  const couponRepository = new CouponsRepositoryPrisma();
  validateCoupon = new ValidateCouponUseCase(couponRepository);
});

test("Deve validar um cupom de desconto", async () => {
  const input = "VALE5";
  const isValidOutput = await validateCoupon.execute(input);
  expect(isValidOutput).toBeTruthy();
});

test("Deve validar um cupom de desconto que não existe", async () => {
  const input = "VALE10";
  expect(validateCoupon.execute(input)).rejects.toThrow(
    new Error("Invalid coupon")
  );
});
