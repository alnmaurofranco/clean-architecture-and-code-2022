import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { GetOrdersOutput } from "./get-orders-output";

export class GetOrdersUseCase {
  orderRepository: OrdersRepository;
  readonly orders: { code: string; total: number }[];

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.orders = [];
  }

  addOrder(code: string, total: number) {
    this.orders.push({ code, total });
  }

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderRepository.findAll();
    for (const order of orders) {
      this.addOrder(order.getCode(), order.getTotal());
    }
    const getOrdersOutput = {
      orders: this.orders,
    } as GetOrdersOutput;
    return getOrdersOutput;
  }
}
