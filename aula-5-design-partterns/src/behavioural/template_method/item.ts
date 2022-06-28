export abstract class Item {
  constructor(
    readonly category: string,
    readonly description: string,
    readonly price: number
  ) {}

  abstract getTax(): number;
}
