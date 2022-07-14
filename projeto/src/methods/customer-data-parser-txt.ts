import { readFile } from "node:fs/promises";
import { CustomerDataParser } from "./customer-data-parser";
import { CustomerData } from "./customer-data.interface";

export class CustomerDataParserTXT extends CustomerDataParser {
  protected async parseData(): Promise<CustomerData[]> {
    const rawData = await readFile(this.filePath, "utf8");
    const data = rawData.toString();
    const lines = data.split("\n");
    const customerData: CustomerData[] = [];
    for (const line of lines) {
      const [name, age, cpf] = line.split("\t");
      customerData.push({ name, age, cpf });
    }
    return customerData;
  }
}
