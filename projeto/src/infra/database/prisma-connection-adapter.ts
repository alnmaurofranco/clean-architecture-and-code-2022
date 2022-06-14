import { Connection } from "./connection.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaAdapter } from "./prisma";

export class PrismaConnectionAdapter implements Connection {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaAdapter;
  }

  async query(statement: string, params?: any[]): Promise<any> {
    return await this.prisma.$queryRaw(Prisma.sql`${statement}`, params);
  }
}
