import validator from "validator";
import { EmailValidatorProtocol } from "./email-validator-protocol";

export class EmailValidatorAdapter implements EmailValidatorProtocol {
  isEmail(value: string): boolean {
    return validator.isEmail(value);
  }
}
