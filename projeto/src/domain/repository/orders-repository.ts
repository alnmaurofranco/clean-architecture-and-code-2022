import { Order } from "../entity/order";

export interface OrdersRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
