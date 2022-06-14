import { Connection } from "./connection.interface";
import pg from "pg-promise";

export class PgPromiseConnectionAdapter implements Connection {
  private pgp: any;
  static instance: PgPromiseConnectionAdapter;

  private constructor() {
    this.pgp = pg()("postgres://postgres:docker@localhost:5432/cleandb");
  }

  static getInstance(): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }
    return PgPromiseConnectionAdapter.instance;
  }

  async query(statement: string, params?: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
