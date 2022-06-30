import { Order } from "../entity/order";

export interface OrdersRepository {
  get(code: string): Promise<Order>;
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
