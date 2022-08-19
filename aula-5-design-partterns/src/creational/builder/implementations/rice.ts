import { AbstractMeal } from "../abstract-meal";
import { MealCompositeProtocol } from "../meal-composite-protocol.interface";

export class Rice extends AbstractMeal {
  constructor(name: string, price: number) {
    super(name, price);
  }
}

const rice = new Rice("Bolo de Doce de Leite", 20);
console.log(rice.getPrice()); // 10
