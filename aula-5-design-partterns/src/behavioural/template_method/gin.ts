import { TaxItem } from "./tax-item";

export class Gin extends TaxItem {
  constructor(description: string, price: number) {
    super("Gin", description, price);
  }

  getTax(): number {
    return 35;
  }
}
