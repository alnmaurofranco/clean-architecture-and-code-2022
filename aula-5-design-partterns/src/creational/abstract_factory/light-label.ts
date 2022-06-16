import { Label } from "./label.interface";

export class LightLabel implements Label {
  color: string;
  constructor() {
    this.color = "black";
  }
}
