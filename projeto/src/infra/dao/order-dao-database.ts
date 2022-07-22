import { OrderDAO } from "../../application/dao/order-dao";
import { Connection } from "../database/connection.interface";

export class OrderDAODatabase implements OrderDAO {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<any> {
    return await this.connection.query(
      "SELECT code, total::float FROM ccca.orders",
      []
    );
  }

  async findByCode(code: string): Promise<any> {
    return await this.connection.query(
      "SELECT code, total::float FROM orders WHERE code = $1 ",
      code
    );
  }
}
