import { Connection } from "../../infra/database/connection.interface";
import { OrderDAO } from "../dao/order-dao";

type OrderOutput = { code: string; total: number };

type GetOrdersOutput = OrderOutput[];

type GetOrdersQuery = OrderOutput[];

export class GetOrders {
  orders: OrderOutput[];

  constructor(readonly orderDAO: OrderDAO) {
    this.orders = [];
  }

  async addOrder(code: string, total: number) {
    this.orders.push({ code, total });
  }

  async execute(): Promise<GetOrdersOutput> {
    const ordersData = await this.orderDAO.findAll();
    ordersData.forEach((order: { code: string; total: number }) =>
      this.addOrder(order.code, order.total)
    );
    return this.orders;
  }
}
