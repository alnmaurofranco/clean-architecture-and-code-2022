import { DiscountStrategy } from "./discount-strategy";
import { ShoppingCart } from "./shopping-cart";

const HUNDRED = 100;
const TWO_HUNDRED = 200;
const FIVE_HUNDRED = 500;
const ONE_THOUSAND = 1000;
const FIVE_PERCENT_DISCOUNT = 5;
const TEN_PERCENT_DISCOUNT = 10;
const FIFTEEN_PERCENT_DISCOUNT = 15;

export class BlackFridayDiscountStrategy implements DiscountStrategy {
  getDiscount(cart: ShoppingCart): number {
    let discount = 0;
    const total = cart.getTotal();
    if (total >= HUNDRED && total < TWO_HUNDRED) {
      discount += FIVE_PERCENT_DISCOUNT;
    }
    if (total >= FIVE_HUNDRED && total < ONE_THOUSAND) {
      discount += TEN_PERCENT_DISCOUNT;
    }
    if (total >= ONE_THOUSAND) {
      discount += FIFTEEN_PERCENT_DISCOUNT;
    }
    return total - total * (discount / 100);
  }
}
