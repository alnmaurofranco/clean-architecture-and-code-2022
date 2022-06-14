import { Order } from "../../../domain/entity/order";
import { OrdersRepository } from "../../../domain/repository/orders-repository";
import { PrismaConnectionAdapter } from "../../database/prisma-connection-adapter";

export class OrdersRepositoryPrisma
  extends PrismaConnectionAdapter
  implements OrdersRepository
{
  async save(order: Order): Promise<void> {
    const data = await this.connection.order.create({
      data: {
        code: order.getCode(),
        cpf: order.getCpf(),
        coupon: order.coupon?.code || "",
        issue_date: order.date,
        freight: order.getFreight(),
        sequence: order.sequence,
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
