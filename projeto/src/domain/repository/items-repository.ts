import { Item } from "../entity/item";

export interface ItemsRepository {
  findById(idItem: number): Promise<Item | undefined>;
}
