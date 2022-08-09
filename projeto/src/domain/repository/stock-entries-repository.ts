import { StockEntry } from "../entity/stock-entry";

export interface StockEntriesRepository {
  findAllByIdItem(idItem: number): Promise<StockEntry[]>;
  save(stockEntry: StockEntry): Promise<void>;
  clear(): Promise<void>;
}
