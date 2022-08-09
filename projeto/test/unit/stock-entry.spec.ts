import { StockEntry } from "../../src/domain/entity/stock-entry";

test("Deve criar uma entrada no estoque", () => {
  const stockEntry = new StockEntry(
    1,
    "in",
    10,
    new Date("2022-08-08T10:00:00")
  );
  expect(stockEntry.idItem).toBe(1);
  expect(stockEntry.operation).toBe("in");
  expect(stockEntry.quantity).toBe(10);
  expect(stockEntry.date).toEqual(new Date("2022-08-08T10:00:00"));
});
