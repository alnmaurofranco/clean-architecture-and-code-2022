import { Button } from "./button.interface";

export class LightButton implements Button {
  color: string;
  backgroundColor: string;

  constructor() {
    this.color = "white";
    this.backgroundColor = "blue";
  }
}
