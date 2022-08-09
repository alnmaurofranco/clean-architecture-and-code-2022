import { StockEntry } from "../../../domain/entity/stock-entry";
import { StockEntriesRepository } from "../../../domain/repository/stock-entries-repository";
import { PrismaConnectionAdapter } from "../../database/prisma-connection-adapter";

export class StockEntriesRepositoryPrisma
  extends PrismaConnectionAdapter
  implements StockEntriesRepository
{
  async findAllByIdItem(idItem: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.stockEntry.findMany({
      where: {
        idItem,
      },
    });
    const stockEntries: StockEntry[] = [];
    stockEntriesData.forEach((stockEntryData) => {
      stockEntries.push(
        new StockEntry(
          stockEntryData.idItem,
          stockEntryData.operation,
          stockEntryData.quantity,
          new Date(stockEntryData.date)
        )
      );
    });
    return stockEntries;
  }

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.stockEntry.create({
      data: {
        idItem: stockEntry.idItem,
        operation: stockEntry.operation,
        quantity: stockEntry.quantity,
        date: stockEntry.date,
      },
    });
  }
}
