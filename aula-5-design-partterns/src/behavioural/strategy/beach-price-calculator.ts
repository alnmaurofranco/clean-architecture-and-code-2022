import { PriceCalculator } from "./price-calculator";

export class BeachPriceCalculator implements PriceCalculator {
  calculate(hours: number): number {
    return 20;
  }
}
