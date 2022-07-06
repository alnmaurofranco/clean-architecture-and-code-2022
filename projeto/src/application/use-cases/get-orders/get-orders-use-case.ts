import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { GetOrdersOutput } from "./get-orders-output";

export class GetOrdersUseCase {
  orderRepository: OrdersRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderRepository.findAll();
    const getOrdersOutput = {
      orders,
    } as GetOrdersOutput;
    return getOrdersOutput;
  }
}
