import { TaxItem } from "./tax-item";

export class Beer extends TaxItem {
  constructor(description: string, price: number) {
    super("Beer", description, price);
  }

  getTax(): number {
    return 10;
  }
}
