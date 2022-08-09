import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { StockEntriesRepository } from "../../../domain/repository/stock-entries-repository";
import { StockCalculator } from "../../../domain/service/stock-calculator";

export class GetStockUseCase {
  stockEntriesRepository: StockEntriesRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntriesRepository =
      repositoryFactory.createStockEntriesRepository();
  }

  async execute(idItem: number): Promise<number> {
    const stockEntries = await this.stockEntriesRepository.findAllByIdItem(
      idItem
    );
    const calculator = new StockCalculator();
    return calculator.calculate(stockEntries);
  }
}
