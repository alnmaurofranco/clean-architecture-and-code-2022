import { StockEntry } from "../../../domain/entity/stock-entry";
import { StockEntriesRepository } from "../../../domain/repository/stock-entries-repository";

export class StockEntriesRepositoryInMemory implements StockEntriesRepository {
  constructor(private stockEntries: StockEntry[] = []) {}

  async findAllByIdItem(idItem: number): Promise<StockEntry[]> {
    return this.stockEntries.filter(
      (stockEntry) => stockEntry.idItem === idItem
    );
  }

  async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry);
  }

  async clear(): Promise<void> {
    this.stockEntries = [];
  }
}
