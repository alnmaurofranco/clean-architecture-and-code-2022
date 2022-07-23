import { Observer } from "./observer";

export class LabelText implements Observer {
  value: string;

  constructor(readonly expression: string) {
    this.value = "";
  }

  update(name: string, value: string): void {
    this.setValue(name, value);
  }

  setValue(name: string, value: string) {
    this.value = this.expression.replace(`{{${name}}}`, value);
  }

  getValue() {
    return this.value;
  }
}
