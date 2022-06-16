import { Button } from "./button.interface";
import { DarkButton } from "./dark-button";
import { DarkLabel } from "./dark-label";
import { Label } from "./label.interface";
import { WidgetFactory } from "./widget-factory.interface";

export class DarkWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    return new DarkLabel();
  }
  createButton(): Button {
    return new DarkButton();
  }
}
