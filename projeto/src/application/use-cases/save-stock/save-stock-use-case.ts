import { StockEntry } from "../../../domain/entity/stock-entry";
import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { StockEntriesRepository } from "../../../domain/repository/stock-entries-repository";
import { SaveStockInput } from "./save-stock-input";

export class SaveStockUseCase {
  stockEntriesRepository: StockEntriesRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntriesRepository =
      repositoryFactory.createStockEntriesRepository();
  }

  async execute(input: SaveStockInput): Promise<void> {
    const stockEntry = new StockEntry(
      input.idItem,
      input.operation,
      input.quantity,
      new Date()
    );
    await this.stockEntriesRepository.save(stockEntry);
  }
}
