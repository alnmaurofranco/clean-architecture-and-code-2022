import { Coupon } from "../../../domain/entity/coupon";
import { Item } from "../../../domain/entity/item";
import { Order } from "../../../domain/entity/order";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { OrderMapper } from "../../../mappers/order-mapper";
import { PrismaConnectionAdapter } from "../../database/prisma-connection-adapter";

export class OrdersRepositoryPrisma
  extends PrismaConnectionAdapter
  implements OrdersRepository
{
  async findAll(): Promise<Order[]> {
    const odersData = await this.connection.order.findMany();
    const orders: Order[] = [];
    for (const orderData of odersData) {
      const order = await this.get(orderData.code);
      orders.push(order);
    }
    return orders;
  }

  async get(code: string): Promise<Order> {
    const orderDataExisting = await this.connection.order.findFirst({
      where: { code },
    });
    if (!orderDataExisting) {
      throw new Error("Order not found");
    }
    const order = OrderMapper.toDomain(orderDataExisting);
    const orderItemsData = await this.connection.orderItem.findMany({
      where: {
        orderId: orderDataExisting.id_order,
      },
    });
    for (const orderItemData of orderItemsData) {
      const itemData = await this.connection.item.findUnique({
        where: {
          id_item: orderItemData.itemId,
        },
      });
      if (!itemData) {
        throw new Error("Item not found");
      }
      const item = new Item(
        itemData.id_item,
        itemData.category,
        itemData.description,
        parseFloat(Number(orderItemData.price).toString()),
        itemData.width as number,
        itemData.height as number,
        itemData.length as number,
        itemData.weight as number
      );
      order.addItem(item, orderItemData.quantity);
    }
    if (orderDataExisting.coupon) {
      const couponData = await this.connection.coupon.findUnique({
        where: { code: orderDataExisting.coupon },
      });
      if (!couponData) {
        throw new Error("Coupon not found");
      }
      const coupon = new Coupon(
        couponData.code,
        couponData.percentage,
        couponData.expire_date ?? undefined
      );
      order.addCoupon(coupon);
    }
    return order;
  }

  async save(order: Order): Promise<void> {
    const data = await this.connection.order.create({
      data: {
        code: order.getCode(),
        cpf: order.getCpf(),
        coupon: order.coupon?.code || "",
        issue_date: order.date,
        freight: order.getFreight(),
        sequence: order.sequence,
        total: order.getTotal(),
      },
    });

    for (const orderItem of order.getOrderItems()) {
      await this.connection.orderItem.create({
        data: {
          itemId: orderItem.idItem,
          orderId: data.id_order,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      });
    }
  }

  async count(): Promise<number> {
    return await this.connection.order.count();
  }
}
