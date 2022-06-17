import { ShoppingCart } from "./shopping-cart";

export interface DiscountStrategy {
  getDiscount(cart: ShoppingCart): number;
}
