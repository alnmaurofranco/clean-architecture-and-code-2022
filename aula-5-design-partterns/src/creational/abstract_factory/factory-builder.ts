import { DarkWidgetFactory } from "./dark-widget-factory";
import { LightWidgetFactory } from "./light-widget-factory";
import { WidgetFactory } from "./widget-factory.interface";

// Simple factory pattern
export class FactoryBuilder {
  static create(type: string): WidgetFactory {
    if (type === "light") return new LightWidgetFactory();
    if (type === "dark") return new DarkWidgetFactory();
    throw new Error("Tipo de widget inválido");
  }
}
