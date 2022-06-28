import { Beer } from "../../../src/behavioural/template_method/beer";
import { Gin } from "../../../src/behavioural/template_method/gin";
import { Invoice } from "../../../src/behavioural/template_method/invoice";
import { Water } from "../../../src/behavioural/template_method/water";
import { Whisky } from "../../../src/behavioural/template_method/whisky";

test("Deve criar uma nota fiscal/fatura", () => {
  const invoice = new Invoice();
  invoice.addItem(new Beer("Heineken", 10));
  invoice.addItem(new Whisky("Jack Daniels", 140));
  invoice.addItem(new Gin("Bombay", 120));
  invoice.addItem(new Water("Bonafonte", 5));
  const taxes = invoice.getTaxes();
  expect(taxes).toBe(85);
});
