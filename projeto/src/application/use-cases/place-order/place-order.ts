import { PlaceOrderInput } from "./place-order-input";
import { PlaceOrderOutput } from "./place-order-output";
import { Order } from "../../../domain/entity/order";
import { ItemsRepository } from "../../../domain/repository/items-repository";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { CouponsRepository } from "../../../domain/repository/coupons-repository";
import { DefaultFreightCalculator } from "../../../domain/entity/default-freight-calculator";
import { RepositoryFactory } from "../../../domain/factory/repository-factory";
import { StockEntriesRepository } from "../../../domain/repository/stock-entries-repository";
import { StockEntry } from "../../../domain/entity/stock-entry";
import { OrderPlaced } from "../../../domain/event/order-placed";
import { Broker } from "../../../infra/broker/broker";

export class PlaceOrder {
  itemsRepository: ItemsRepository;
  couponsRepository: CouponsRepository;
  ordersRepository: OrdersRepository;
  stockEntriesRepository: StockEntriesRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.itemsRepository = repositoryFactory.createItemsRepository();
    this.couponsRepository = repositoryFactory.createCouponsRepository();
    this.ordersRepository = repositoryFactory.createOrderRepository();
    this.stockEntriesRepository =
      repositoryFactory.createStockEntriesRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.ordersRepository.count()) + 1;
    const order = new Order(
      input.cpf,
      input.date,
      new DefaultFreightCalculator(),
      sequence
    );
    for (const orderItem of input.orderItems) {
      const item = await this.itemsRepository.findById(orderItem.idItem);
      if (!item) {
        throw new Error("Item not found");
      }
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponsRepository.findByCode(input.coupon);
      if (!coupon) {
        throw new Error("Coupon not found");
      }
      order.addCoupon(coupon);
    }
    await this.ordersRepository.save(order);

    // await input.orderItems.reduce(async (promise, orderItem) => {
    //   await promise;
    //   this.stockEntriesRepository.save(
    //     new StockEntry(orderItem.idItem, "out", orderItem.quantity, order.date)
    //   );
    // }, Promise.resolve());
    const orderPlacedEvent = new OrderPlaced(order);
    this.broker.publish(orderPlacedEvent);

    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(), total);
    return output;
  }
}
