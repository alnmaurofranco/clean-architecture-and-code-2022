import { Connection } from "../../infra/database/connection.interface";
import { OrderDAO } from "../dao/order-dao";

type GetOrderInput = {
  code: string;
};

type GetOrderOutput = {
  code: string;
  total: number;
};

type GetOrderQuery = [
  {
    code: string;
    total: number;
  }
];

export class GetOrder {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute({ code }: GetOrderInput): Promise<GetOrderOutput> {
    const [orderData] = await this.orderDAO.findByCode(code);
    return orderData;
  }
}
