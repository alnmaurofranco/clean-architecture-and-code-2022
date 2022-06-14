import { CouponsRepository } from "../../../domain/repository/coupons-repository";
import { ValidateCouponOutput } from "./validate-coupon-output";

type ValidateCouponInput = string;

export class ValidateCouponUseCase {
  constructor(private readonly couponsRepository: CouponsRepository) {}

  async execute(code: ValidateCouponInput): Promise<ValidateCouponOutput> {
    const coupon = await this.couponsRepository.findByCode(code);
    if (!coupon) {
      throw new Error("Invalid coupon");
    }
    return coupon.isValid();
  }
}
