import { Customer } from "../customer/customer";
import { Vehicle } from "./vehicle";

export class EnterpriseCar implements Vehicle {
  constructor(public name: string, private readonly customer: Customer) {}

  pickUp(): string {
    return `${this.name} carro Enterprise está indo buscar ${this.customer.name}`;
  }
}
