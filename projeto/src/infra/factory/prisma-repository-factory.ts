import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { CouponsRepository } from "../../domain/repository/coupons-repository";
import { ItemsRepository } from "../../domain/repository/items-repository";
import { OrdersRepository } from "../../domain/repository/orders-repository";
import { CouponsRepositoryPrisma } from "../repository/database/coupons-repository-prisma";
import { ItemsRepositoryPrisma } from "../repository/database/items-repository-prisma";
import { OrdersRepositoryPrisma } from "../repository/database/orders-repository-prisma";

export class PrismaRepositoryFactory implements RepositoryFactory {
  createItemsRepository(): ItemsRepository {
    return new ItemsRepositoryPrisma();
  }

  createCouponsRepository(): CouponsRepository {
    return new CouponsRepositoryPrisma();
  }

  createOrderRepository(): OrdersRepository {
    return new OrdersRepositoryPrisma();
  }
}
