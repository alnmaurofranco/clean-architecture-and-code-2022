import { Connection } from "../../infra/database/connection.interface";

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
  constructor(readonly connection: Connection) {}

  async execute({ code }: GetOrderInput): Promise<GetOrderOutput> {
    const [orderData] = await this.connection.query<GetOrderQuery>(
      "SELECT code, total::float FROM orders WHERE code = $1 ",
      code
    );
    return orderData;
  }
}
