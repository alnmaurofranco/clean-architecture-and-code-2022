import { Circle } from "./circle";

test("Should calculate the area of circle", () => {
  const circle = new Circle(2);
  expect(circle.getArea()).toBe(12.566370614359172);
});
