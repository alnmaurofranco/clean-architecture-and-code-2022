import { Connection } from "../../infra/database/connection.interface";

type GetOrderInput = {
  code: string;
};

type GetOrderOutput = {
  orders: { code: string; total: number }[];
};

export class GetOrder {
  constructor(readonly connection: Connection) {}

  async execute({ code }: GetOrderInput): Promise<GetOrderOutput> {
    const order = await this.connection
      .$executeRaw<GetOrderOutput>`SELECT * FROM orders WHERE code = ${code}`;
    return order;
  }
}
