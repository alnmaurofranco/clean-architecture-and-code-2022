export interface Connection {
  query<T = any>(statement: string, params?: any): Promise<T>;
}
