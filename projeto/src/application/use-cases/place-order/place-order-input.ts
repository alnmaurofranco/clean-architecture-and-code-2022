import { OrderItem } from "../../../domain/entity/orderItems";

type OrderItems = { idItem: number; quantity: number };

export class PlaceOrderInput {
  constructor(
    readonly cpf: string,
    readonly orderItems: OrderItems[],
    readonly date: Date,
    readonly coupon?: string
  ) {}
}
