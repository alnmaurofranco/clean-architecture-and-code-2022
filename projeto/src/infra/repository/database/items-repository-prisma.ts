import { PrismaClient } from "@prisma/client";
import { Item } from "../../../domain/entity/item";
import { ItemsRepository } from "../../../domain/repository/items-repository";
import { PrismaAdapter } from "../../database/prisma";

export class ItemsRepositoryPrisma implements ItemsRepository {
  private readonly connection: PrismaClient = PrismaAdapter;

  async findById(idItem: number): Promise<Item | undefined> {
    const item = await this.connection.item.findUnique({
      where: {
        id_item: idItem,
      },
    });
    if (!item) return;
    return new Item(
      item.id_item,
      item.category,
      item.description,
      Number(item.price),
      item.width ?? 0,
      item.height ?? 0,
      item.length ?? 0,
      item.weight ?? 0
    );
  }
}
