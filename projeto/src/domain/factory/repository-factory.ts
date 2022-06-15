import { CouponsRepository } from "../repository/coupons-repository";
import { ItemsRepository } from "../repository/items-repository";
import { OrdersRepository } from "../repository/orders-repository";

export interface RepositoryFactory {
  createItemsRepository(): ItemsRepository;
  createCouponsRepository(): CouponsRepository;
  createOrderRepository(): OrdersRepository;
}
