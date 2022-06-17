import { SimulateFreightUseCase } from "../../application/use-cases/simulate-freight/simulate-freight-use-case";
import { FreightCalculator } from "../../domain/entity/freight-calculator.interface";
import { ItemsRepository } from "../../domain/repository/items-repository";

export class SimulateFreightController {
  constructor(
    readonly itemsRepository: ItemsRepository,
    readonly freightCalculator: FreightCalculator
  ) {}

  async handle(params: any, body: any) {
    const simulateFreight = new SimulateFreightUseCase(
      this.itemsRepository,
      this.freightCalculator
    );
    const input = body;
    return await simulateFreight.execute(input);
  }
}
