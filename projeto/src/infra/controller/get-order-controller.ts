import { GetOrderUseCase } from "../../application/use-cases/get-order/get-order-use-case";
import { RepositoryFactory } from "../../domain/factory/repository-factory";

export class GetOrderController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async handle(params: any, body: any) {
    const getOrder = new GetOrderUseCase(this.repositoryFactory);
    const getOrderOutput = await getOrder.execute({ code: params.code });
    return getOrderOutput;
  }
}
