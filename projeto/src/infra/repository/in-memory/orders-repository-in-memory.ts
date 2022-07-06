import { Order } from "../../../domain/entity/order";
import { OrdersRepository } from "../../../domain/repository/orders-repository";

export class OrdersRepositoryInMemory implements OrdersRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async get(code: string): Promise<Order> {
    const order = await this.orders.find((order) => order.getCode() === code);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  async save(order: Order): Promise<void> {
    await this.orders.push(order);
  }

  async count(): Promise<number> {
    return await this.orders.length;
  }
}
