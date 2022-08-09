import { GetStockUseCase } from "../../../src/application/use-cases/get-stock/get-stock-use-case";
import { SaveStockUseCase } from "../../../src/application/use-cases/save-stock/save-stock-use-case";
import { PrismaRepositoryFactory } from "../../../src/infra/factory/prisma-repository-factory";

test("Deve obter o estoque de um item", async () => {
  const repositoryFactory = new PrismaRepositoryFactory();
  const stockEntriesRepository =
    repositoryFactory.createStockEntriesRepository();
  await stockEntriesRepository.clear();
  const saveStockUseCase = new SaveStockUseCase(repositoryFactory);
  const saveStockInput = {
    idItem: 1,
    operation: "in",
    quantity: 10,
  };
  await saveStockUseCase.execute(saveStockInput);
  const getStockUseCase = new GetStockUseCase(repositoryFactory);
  const total = await getStockUseCase.execute(1);
  expect(total).toBe(10);
});
