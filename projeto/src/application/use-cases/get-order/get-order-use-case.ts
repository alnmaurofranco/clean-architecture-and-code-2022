import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { GetOrderInput } from "./get-order-input";
import { GetOrderOutput } from "./get-order-output";

export class GetOrderUseCase {
  orderRepository: OrdersRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(input: GetOrderInput): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(input.code);
    const getOrderOutput = {
      code: order.getCode(),
      total: order.getTotal(),
    } as GetOrderOutput;
    return getOrderOutput;
  }
}
