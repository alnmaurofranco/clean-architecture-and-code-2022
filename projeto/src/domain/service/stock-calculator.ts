import { StockEntry } from "../entity/stock-entry";

export class StockCalculator {
  calculate(stockEntries: StockEntry[]): number {
    let total = 0;
    stockEntries.reduce((stockEntryAccumulator, stockEntryCurrent) => {
      if (stockEntryCurrent.operation === "in") {
        total += stockEntryCurrent.quantity;
      }
      if (stockEntryCurrent.operation === "out") {
        total -= stockEntryCurrent.quantity;
      }
      return stockEntryAccumulator;
    }, total);
    return total;
  }
}
