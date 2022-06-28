import { TaxItem } from "./tax-item";

export class Water extends TaxItem {
  constructor(description: string, price: number) {
    super("Water", description, price);
  }

  getTax(): number {
    return 0;
  }
}
