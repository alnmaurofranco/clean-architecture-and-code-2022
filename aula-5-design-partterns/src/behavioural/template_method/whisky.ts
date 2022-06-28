import { TaxItem } from "./tax-item";

export class Whisky extends TaxItem {
  constructor(description: string, price: number) {
    super("Whisky", description, price);
  }

  getTax(): number {
    return 30;
  }
}
