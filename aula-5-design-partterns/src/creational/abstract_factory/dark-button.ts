import { Button } from "./button.interface";

export class DarkButton implements Button {
  color: string;
  backgroundColor: string;

  constructor() {
    this.color = "black";
    this.backgroundColor = "white";
  }
}
