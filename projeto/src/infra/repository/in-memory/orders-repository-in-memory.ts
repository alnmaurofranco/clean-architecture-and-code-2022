import { Order } from "../../../domain/entity/order";
import { OrdersRepository } from "../../../domain/repository/orders-repository";

export class OrdersRepositoryInMemory implements OrdersRepository {
  constructor(public orders: Order[] = []) {}

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }
}
