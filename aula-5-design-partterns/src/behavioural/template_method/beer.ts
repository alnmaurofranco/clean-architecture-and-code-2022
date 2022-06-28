import { Item } from "./item";

export class Beer extends Item {
  constructor(description: string, price: number) {
    super("Beer", description, price);
  }

  getTax(): number {
    return (this.price * 10) / 100;
  }
}
