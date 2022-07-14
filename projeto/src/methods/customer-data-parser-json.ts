import { readFile } from "node:fs/promises";
import { CustomerDataParser } from "./customer-data-parser";
import { CustomerData } from "./customer-data.interface";

export class CustomerDataParserJSON extends CustomerDataParser {
  protected async parseData(): Promise<CustomerData[]> {
    const rawData = await readFile(this.filePath, "utf8");
    const data = JSON.parse(rawData.toString());
    const customerData: CustomerData[] = [];
    for (const customer of data) {
      const { name, age, cpf } = customer;
      customerData.push({ name, age, cpf });
    }
    return customerData;
  }
}

type A = Awaited<ReturnType<typeof JSON.parse>>;
