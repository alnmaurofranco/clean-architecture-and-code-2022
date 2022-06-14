import { SimulateFreightUseCase } from "../../src/application/use-cases/simulate-freight/simulate-freight-use-case";
import { DefaultFreightCalculator } from "../../src/domain/entity/default-freight-calculator";
import { ItemsRepositoryPrisma } from "../../src/infra/repository/database/items-repository-prisma";

test("Deve simular o frete dos itens", async () => {
  const itemsRepository = new ItemsRepositoryPrisma();
  const freightCalculator = new DefaultFreightCalculator();
  const simulateFreight = new SimulateFreightUseCase(
    itemsRepository,
    freightCalculator
  );
  const input = [
    {
      idItem: 4,
      quantity: 1,
    },
    {
      idItem: 5,
      quantity: 1,
    },
    {
      idItem: 6,
      quantity: 3,
    },
  ];
  const output = await simulateFreight.execute({ items: input });
  expect(output.amount).toBe(80);
});
