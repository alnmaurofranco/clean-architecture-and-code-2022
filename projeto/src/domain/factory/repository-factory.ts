import { CouponsRepository } from "../repository/coupons-repository";
import { ItemsRepository } from "../repository/items-repository";
import { OrdersRepository } from "../repository/orders-repository";
import { StockEntriesRepository } from "../repository/stock-entries-repository";

export interface RepositoryFactory {
  createItemsRepository(): ItemsRepository;
  createCouponsRepository(): CouponsRepository;
  createOrderRepository(): OrdersRepository;
  createStockEntriesRepository(): StockEntriesRepository;
}
