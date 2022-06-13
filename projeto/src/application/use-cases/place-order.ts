import { PlaceOrderInput } from "./place-order-input";
import { PlaceOrderOutput } from "./place-order-output";
import { Order } from "../../domain/entity/order";
import { ItemsRepository } from "../../domain/repository/items-repository";
import { OrdersRepository } from "../../domain/repository/orders-repository";
import { CouponsRepository } from "../../domain/repository/coupons-repository";
import { DefaultFreightCalculator } from "../../domain/entity/default-freight-calculator";

export class PlaceOrder {
  constructor(
    readonly itemsRepository: ItemsRepository,
    readonly ordersRepository: OrdersRepository,
    readonly couponsRepository: CouponsRepository
  ) {}

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
    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(), total);
    return output;
  }
}
