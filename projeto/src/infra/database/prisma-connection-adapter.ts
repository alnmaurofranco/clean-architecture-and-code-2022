import { Connection } from "./connection.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaAdapter } from "./prisma";

export class PrismaConnectionAdapter implements Connection {
  public readonly connection: PrismaClient = PrismaAdapter;

  async query(statement: string, params?: any[]): Promise<any> {
    return await this.connection.$queryRaw(Prisma.sql`${statement}`, params);
  }
}
