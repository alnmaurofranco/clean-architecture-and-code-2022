import { Button } from "./button.interface";
import { Label } from "./label.interface";

export interface WidgetFactory {
  createLabel(): Label;
  createButton(): Button;
}
