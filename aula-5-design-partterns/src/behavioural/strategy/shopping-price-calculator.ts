import { PriceCalculator } from "./price-calculator";

export class ShoppingPriceCalculator implements PriceCalculator {
  calculate(hours: number): number {
    return hours * 10;
  }
}
