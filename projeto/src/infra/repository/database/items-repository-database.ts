import { Item } from "../../../domain/entity/item";
import { ItemsRepository } from "../../../domain/repository/items-repository";
import { Connection } from "../../database/connection.interface";

export class ItemsRepositoryDatabase implements ItemsRepository {
  constructor(readonly connection: Connection) {}

  async findById(idItem: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query(
      "SELECT * FROM items WHERE id_item = $1",
      [idItem]
    );
    if (!itemData) return;
    return new Item(
      itemData.id_item,
      itemData.category,
      itemData.description,
      Number(itemData.price),
      itemData.width,
      itemData.height,
      itemData.length,
      itemData.weight
    );
  }
}
