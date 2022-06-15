import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { CouponsRepository } from "../../domain/repository/coupons-repository";
import { ItemsRepository } from "../../domain/repository/items-repository";
import { OrdersRepository } from "../../domain/repository/orders-repository";
import { CouponsRepositoryInMemory } from "../repository/in-memory/coupons-repository-in-memory";
import { ItemsRepositoryInMemory } from "../repository/in-memory/items-repository-in-memory";
import { OrdersRepositoryInMemory } from "../repository/in-memory/orders-repository-in-memory";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createItemsRepository(): ItemsRepository {
    return new ItemsRepositoryInMemory();
  }

  createCouponsRepository(): CouponsRepository {
    return new CouponsRepositoryInMemory();
  }

  createOrderRepository(): OrdersRepository {
    return new OrdersRepositoryInMemory();
  }
}
