import { Coupon } from "../../../domain/entity/coupon";
import { CouponsRepository } from "../../../domain/repository/coupons-repository";
import { PrismaConnectionAdapter } from "../../database/prisma-connection-adapter";

export class CouponsRepositoryPrisma
  extends PrismaConnectionAdapter
  implements CouponsRepository
{
  async findByCode(code: string): Promise<Coupon | undefined> {
    const coupon = await this.connection.coupon.findUnique({
      where: {
        code,
      },
    });
    if (!coupon) return;
    return new Coupon(
      coupon.code,
      coupon.percentage,
      coupon.expire_date || undefined
    );
  }
}
