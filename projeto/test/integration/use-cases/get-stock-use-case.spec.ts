import { GetStockUseCase } from "../../../src/application/use-cases/get-stock/get-stock-use-case";
import { PrismaRepositoryFactory } from "../../../src/infra/factory/prisma-repository-factory";

test("Deve obter o estoque de um item", async () => {
  const repositoryFactory = new PrismaRepositoryFactory();
  const getStockUseCase = new GetStockUseCase(repositoryFactory);
  const total = await getStockUseCase.execute(1);
  expect(total).toBe(0);
});
