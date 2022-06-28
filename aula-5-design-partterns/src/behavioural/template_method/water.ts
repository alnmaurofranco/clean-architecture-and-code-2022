import { Item } from "./item";

export class Water extends Item {
  constructor(description: string, price: number) {
    super("Water", description, price);
  }

  getTax(): number {
    return (this.price * 0) / 100;
  }
}
