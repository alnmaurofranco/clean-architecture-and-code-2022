import { Item } from "./item";

export class Gin extends Item {
  constructor(description: string, price: number) {
    super("Gin", description, price);
  }

  getTax(): number {
    return (this.price * 35) / 100;
  }
}
