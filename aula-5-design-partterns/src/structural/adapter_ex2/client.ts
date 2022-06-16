import {
  EmailValidatorFnProtocol,
  EmailValidatorProtocol,
} from "./validation/email-validator-protocol";

export const validaEmail = (
  emailValidator: EmailValidatorProtocol,
  email: string
): string => {
  if (emailValidator.isEmail(email)) {
    return "Email válido";
  }
  return "Email inválido";
};

export const validaEmailFn = (
  emailValidator: EmailValidatorFnProtocol,
  email: string
): string => {
  if (emailValidator(email)) {
    return "Email válido";
  }
  return "Email inválido";
};
