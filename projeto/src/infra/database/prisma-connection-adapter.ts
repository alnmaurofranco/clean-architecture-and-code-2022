import { Connection } from "./connection.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaAdapter } from "./prisma";

export class PrismaConnectionAdapter implements Connection {
  public readonly connection: PrismaClient = PrismaAdapter;

  async query<T>(statement: string, params?: any): Promise<T> {
    return await this.connection.$queryRawUnsafe<T>(`${statement}`, params);
  }
}
