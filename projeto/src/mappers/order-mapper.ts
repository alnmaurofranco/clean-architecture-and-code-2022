import { Order } from "../domain/entity/order";

import { Order as OrderRaw } from "@prisma/client";
import { DefaultFreightCalculator } from "../domain/entity/default-freight-calculator";

export class OrderMapper {
  public static toDomain(orderRaw: OrderRaw): Order {
    const freightCalculator = new DefaultFreightCalculator();
    return new Order(
      orderRaw.cpf,
      orderRaw.issue_date,
      freightCalculator,
      orderRaw.sequence,
      Number(orderRaw.freight)
    );
  }
}
