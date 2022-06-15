import { Button } from "./button";
import { Label } from "./label";

export interface WidgetFactory {
  createLabel(): Label;
  createButton(): Button;
}
