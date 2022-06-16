import { Button } from "./button.interface";
import { Label } from "./label.interface";
import { WidgetFactory } from "./widget-factory.interface";

export class View {
  label: Label;
  button: Button;

  constructor(widgetFactory: WidgetFactory) {
    this.label = widgetFactory.createLabel();
    this.button = widgetFactory.createButton();
  }
}
