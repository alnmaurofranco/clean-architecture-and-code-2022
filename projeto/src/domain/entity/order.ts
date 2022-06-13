import { Coupon } from "./coupon";
import { CPF } from "./cpf";
import { Item } from "./item";
import { OrderItem } from "./orderItems";
import { FreightCalculator } from "./freight-calculator.interface";
import { DefaultFreightCalculator } from "./default-freight-calculator";
import { OrderCode } from "./order-code";

export class Order {
  private cpf: CPF;
  coupon: Coupon | undefined;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1,
    private freight: number = 0,
    private orderItems: OrderItem[] = []
  ) {
    this.cpf = new CPF(cpf);
    this.code = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number): void {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getCode(): string {
    return this.code.value;
  }

  getFreight(): number {
    return this.freight;
  }

  getTotal(): number {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    total += this.freight;
    return total;
  }
}
