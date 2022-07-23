import { InputText } from "../../../src/behavioural/observer/input-text";
import { LabelText } from "../../../src/behavioural/observer/label-text";

test("Deve criar um componente reativo", () => {
  const inputText = new InputText("country");
  const labelBr = new LabelText("País: {{country}}");
  const labelEn = new LabelText("Country: {{country}}");
  inputText.register(labelBr);
  inputText.register(labelEn);
  inputText.setValue("Brasil");
  const valueBr = labelBr.getValue();
  const valueEn = labelEn.getValue();
  expect(valueBr).toBe("País: Brasil");
  expect(valueEn).toBe("Country: Brasil");
});
