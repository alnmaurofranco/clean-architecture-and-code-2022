import { PgPromiseConnectionAdapter } from "../../src/infra/database/pg-promise-connection-adapter";
import { PrismaConnectionAdapter } from "../../src/infra/database/prisma-connection-adapter";

test("Deve criar uma conexão com banco de dados PostgreSQL", async () => {
  const connection = new PgPromiseConnectionAdapter();
  expect(connection).toBeDefined();
});

test("Deve criar uma conexão com banco de dados PostgreSQL com PrismaORM", async () => {
  const connection = new PrismaConnectionAdapter();
  expect(connection).toBeDefined();
});
