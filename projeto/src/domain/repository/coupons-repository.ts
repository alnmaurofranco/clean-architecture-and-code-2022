import { Coupon } from "../entity/coupon";

export interface CouponsRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
