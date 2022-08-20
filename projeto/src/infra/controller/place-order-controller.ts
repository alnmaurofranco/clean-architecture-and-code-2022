import { PlaceOrder } from "../../application/use-cases/place-order/place-order";
import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { Broker } from "../broker/broker";
import { PrismaRepositoryFactory } from "../factory/prisma-repository-factory";

export class PlaceOrderController {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {}

  async handle(params: any, body: any) {
    const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker);
    const input = body;
    input.date = new Date(input.date);
    return await placeOrder.execute(input);
  }
}
