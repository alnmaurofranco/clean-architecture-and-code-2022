import { CurrencyAPI } from "./currency-api";

export class CurrencyAPIFakeInMemory implements CurrencyAPI {
  convert(amount: number, currency: string): number {
    if (currency === "USD") {
      return amount * 5;
    }
    return amount;
  }
}
