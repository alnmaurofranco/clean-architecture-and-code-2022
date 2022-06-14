import { FreightCalculator } from "../../../domain/entity/freight-calculator.interface";
import { ItemsRepository } from "../../../domain/repository/items-repository";
import { SimulateFreightInput } from "./simulate-freight-input";
import { SimulateFreightOutput } from "./simulate-freight-output";

export class SimulateFreightUseCase {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly freightCalculator: FreightCalculator
  ) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0;
    for (const inputItem of input.items) {
      const itemExistsInDb = await this.itemsRepository.findById(
        inputItem.idItem
      );
      if (!itemExistsInDb) {
        throw new Error("Item not found");
      }
      amount +=
        this.freightCalculator.calculate(itemExistsInDb) * inputItem.quantity;
    }
    return { amount };
  }
}
