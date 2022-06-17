import { PriceCalculator } from "./price-calculator";

export class AirportPriceCalculator implements PriceCalculator {
  calculate(hours: number): number {
    let price = 20;
    const remainingHours = hours - 3;
    if (remainingHours <= 0) {
      return price;
    }
    price += remainingHours * 10;
    return price;
  }
}
