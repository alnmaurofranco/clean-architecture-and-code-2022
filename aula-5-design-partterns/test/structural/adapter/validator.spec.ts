import {
  validaEmail,
  validaEmailFn,
} from "../../../src/structural/adapter_ex2/client";
import { EmailValidatorAdapter } from "../../../src/structural/adapter_ex2/validation/email-validator-adapter";
import { emailValidatorFnAdapter } from "../../../src/structural/adapter_ex2/validation/email-validator-fn-adapter";

test("Deve receber um e-mail válido", () => {
  const email = "nijhikkus@are.nc";
  const validator = new EmailValidatorAdapter();
  const isValid = validaEmail(validator, email);
  expect(isValid).toBe("Email válido");
});

test("Deve receber um e-mail válido com adapter em função", () => {
  const email = "nijhikkus@are.nc";
  const validator = emailValidatorFnAdapter;
  const isValid = validaEmailFn(validator, email);
  expect(isValid).toBe("Email válido");
});

test("Deve receber um e-mail inválido", () => {
  const email = "nijhikkus@";
  const validator = new EmailValidatorAdapter();
  const isValid = validaEmail(validator, email);
  expect(isValid).toBe("Email inválido");
});

test("Deve receber um e-mail inválido com adapter em função", () => {
  const email = "nijhikkus@";
  const validator = emailValidatorFnAdapter;
  const isValid = validaEmailFn(validator, email);
  expect(isValid).toBe("Email inválido");
});
