import { StockEntry } from "../../domain/entity/stock-entry";
import { OrderPlaced } from "../../domain/event/order-placed";
import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { StockEntriesRepository } from "../../domain/repository/stock-entries-repository";
import { Handler } from "../../infra/broker/handler";

export class OrderPlacedStockHandler implements Handler {
  name = this.constructor.name;
  stockEntriesRepository: StockEntriesRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntriesRepository =
      repositoryFactory.createStockEntriesRepository();
  }

  handle(event: OrderPlaced): void {
    for (const orderItem of event.order.getOrderItems()) {
      const stockEntry = new StockEntry(
        orderItem.idItem,
        "out",
        orderItem.quantity,
        event.order.date
      );
      this.stockEntriesRepository.save(stockEntry);
    }
  }
}
