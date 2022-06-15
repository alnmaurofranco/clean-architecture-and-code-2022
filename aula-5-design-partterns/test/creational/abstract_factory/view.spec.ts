import { DarkWidgetFactory } from "../../../src/creational/abstract_factory/dark-widget-factory";
import { LightWidgetFactory } from "../../../src/creational/abstract_factory/light-widget-factory";
import { View } from "../../../src/creational/abstract_factory/view";

test("Deve criar uma interface gráfica com tema claro", () => {
  const lightTheme = new LightWidgetFactory();
  const view = new View(lightTheme);
  expect(view.label.color).toBe("black");
  expect(view.button.color).toBe("white");
  expect(view.button.backgroundColor).toBe("blue");
});

test("Deve criar uma interface gráfica com tema escuro", () => {
  const darkTheme = new DarkWidgetFactory();
  const view = new View(darkTheme);
  expect(view.label.color).toBe("white");
  expect(view.button.color).toBe("black");
  expect(view.button.backgroundColor).toBe("white");
});
