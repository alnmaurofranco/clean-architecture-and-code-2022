export interface OrderDAO {
  findAll(): Promise<any>;
  findByCode(code: string): Promise<any>;
}
