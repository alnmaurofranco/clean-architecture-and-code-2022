import { Connection } from "./connection.interface";
import pg from "pg-promise";

export class PgPromiseConnectionAdapter implements Connection {
  private pgp: any;

  constructor() {
    this.pgp = pg()(
      "postgres://postgres:docker@localhost:5432/cleandb?schema=ccca"
    );
  }

  async query(statement: string, params?: any[]): Promise<any> {
    return await this.pgp.query(statement, params);
  }
}
