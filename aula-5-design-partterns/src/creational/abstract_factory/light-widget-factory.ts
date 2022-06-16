import { Button } from "./button.interface";
import { Label } from "./label.interface";
import { LightButton } from "./light-button";
import { LightLabel } from "./light-label";
import { WidgetFactory } from "./widget-factory.interface";

export class LightWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    return new LightLabel();
  }
  createButton(): Button {
    return new LightButton();
  }
}
