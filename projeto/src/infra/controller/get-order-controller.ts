import { GetOrder } from "../../application/query/get-order";
import { GetOrderUseCase } from "../../application/use-cases/get-order/get-order-use-case";
import { Connection } from "../database/connection.interface";

export class GetOrderController {
  constructor(readonly connection: Connection) {}

  async handle(params: any, body: any) {
    const getOrder = new GetOrder(this.connection);
    const getOrderOutput = await getOrder.execute({ code: params.code });
    return getOrderOutput;
  }
}
