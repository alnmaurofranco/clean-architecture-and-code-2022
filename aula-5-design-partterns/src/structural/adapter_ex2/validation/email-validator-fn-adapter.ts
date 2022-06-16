import { EmailValidatorFnProtocol } from "./email-validator-protocol";
import validator from "validator";

export const emailValidatorFnAdapter: EmailValidatorFnProtocol = (
  value: string
): boolean => validator.isEmail(value);
