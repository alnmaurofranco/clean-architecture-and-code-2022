import { DiscountStrategy } from "./discount-strategy";
import { ShoppingCart } from "./shopping-cart";

export class DefaultDiscount implements DiscountStrategy {
  getDiscount(cart: ShoppingCart): number {
    let discount = 0;
    const total = cart.getTotal();
    if (total >= 100 && total < 200) {
      discount += 10;
    }
    if (total >= 200 && total < 300) {
      discount += 20;
    }
    if (total >= 300) {
      discount += 30;
    }
    return total - total * (discount / 100);
  }
}
