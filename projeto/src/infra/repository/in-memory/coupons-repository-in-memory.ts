import { Coupon } from "../../../domain/entity/coupon";
import { CouponsRepository } from "../../../domain/repository/coupons-repository";

export class CouponsRepositoryInMemory implements CouponsRepository {
  constructor(public coupons: Coupon[] = [new Coupon("VALE5", 5)]) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.code === code);
  }
}
