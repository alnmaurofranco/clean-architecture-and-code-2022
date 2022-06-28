import { Item } from "./item";
import { TaxItem } from "./tax-item";

export class Invoice {
  constructor(public items: Item[] = []) {}

  addItem(item: Item) {
    this.items.push(item);
  }

  getTaxes(): number {
    let taxes = 0;
    for (const item of this.items) {
      if (item instanceof TaxItem) {
        taxes += item.calculateTax();
      }
    }
    return taxes;
  }
}
