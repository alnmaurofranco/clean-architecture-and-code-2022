import { Label } from "./label.interface";

export class DarkLabel implements Label {
  color: string;
  constructor() {
    this.color = "white";
  }
}
