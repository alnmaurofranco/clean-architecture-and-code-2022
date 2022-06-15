import { Item } from "../../../domain/entity/item";
import { ItemsRepository } from "../../../domain/repository/items-repository";

export class ItemsRepositoryInMemory implements ItemsRepository {
  constructor(
    public items: Item[] = [
      new Item(1, "Café", "Melita", 13, 13, 13, 10, 0.5),
      new Item(2, "Leite", "Parmalat", 5, 5, 5, 10, 0.5),
      new Item(3, "Acuçar", "Barra", 3, 3, 3, 10, 0.5),
      new Item(4, "Sucrilhos", "Nescau", 1000, 100, 30, 10, 3),
      new Item(5, "Sucrilhos", "Kellogrs", 5000, 100, 50, 50, 2),
      new Item(6, "Sucrilhos", "Chocobolinha", 30, 10, 10, 10, 0.9),
    ]
  ) {}

  async findById(idItem: number): Promise<Item | undefined> {
    return this.items.find((item) => item.idItem === idItem);
  }
}
