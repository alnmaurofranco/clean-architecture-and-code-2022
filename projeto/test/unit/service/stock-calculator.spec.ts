import { StockEntry } from "../../../src/domain/entity/stock-entry";
import { StockCalculator } from "../../../src/domain/service/stock-calculator";

test("Deve calcular o estoque disponível para um item", () => {
  const calculator = new StockCalculator();
  const stockEntries = [
    new StockEntry(1, "in", 10, new Date("2022-08-08T10:00:00")),
    new StockEntry(1, "out", 5, new Date("2022-08-09T10:00:00")),
  ];
  const total = calculator.calculate(stockEntries);
  expect(total).toBe(5);
});
