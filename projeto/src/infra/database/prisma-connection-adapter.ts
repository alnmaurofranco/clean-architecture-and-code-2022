import { Connection } from "./connection.interface";
import { PrismaClient, Prisma } from "@prisma/client";

export class PrismaConnectionAdapter implements Connection {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async query(statement: string, params?: any[]): Promise<any> {
    return await this.prisma.$queryRaw(Prisma.sql`${statement}`, params);
  }
}
