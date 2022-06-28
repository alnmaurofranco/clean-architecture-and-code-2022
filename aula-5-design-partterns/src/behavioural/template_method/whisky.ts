import { Item } from "./item";

export class Whisky extends Item {
  constructor(description: string, price: number) {
    super("Whisky", description, price);
  }

  getTax(): number {
    return (this.price * 30) / 100;
  }
}
