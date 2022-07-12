import { GetOrdersUseCase } from "../../application/use-cases/get-orders/get-orders-use-case";
import { RepositoryFactory } from "../../domain/factory/repository-factory";

export class GetOrdersController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async handle(params: any, body: any) {
    const getOrders = new GetOrdersUseCase(this.repositoryFactory);
    const getOrdersOutput = await getOrders.execute();
    return getOrdersOutput;
  }
}
