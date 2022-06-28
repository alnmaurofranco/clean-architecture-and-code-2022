import { Item } from "./item";

export class Invoice {
  constructor(public items: Item[] = []) {}

  addItem(item: Item) {
    this.items.push(item);
  }

  getTaxes(): number {
    let taxes = 0;
    for (const item of this.items) {
      taxes += item.getTax();
    }
    return taxes;
  }
}
