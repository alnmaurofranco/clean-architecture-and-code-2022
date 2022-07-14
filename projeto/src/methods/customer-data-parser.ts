import { CustomerData } from "./customer-data.interface";

export abstract class CustomerDataParser {
  private customerData: CustomerData[] = [];

  constructor(protected filePath: string) {}

  readonly fixCustomerData = async (): Promise<void> => {
    this.customerData = await this.parseData();
    this.customerData = this.fixCPF();
  };

  private fixCPF(): CustomerData[] {
    return this.customerData.map((customer) => ({
      ...customer,
      cpf: customer.cpf.replace(/\D/g, ""),
    }));
  }

  protected abstract parseData(): Promise<CustomerData[]>;
}
