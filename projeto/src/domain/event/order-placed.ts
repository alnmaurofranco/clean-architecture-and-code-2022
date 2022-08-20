import { DomainEvent } from "../../infra/broker/domain-event";
import { Order } from "../entity/order";

export class OrderPlaced implements DomainEvent {
  name = this.constructor.name;
  // Poderia também passar apenas um DTO
  constructor(readonly order: Order) {}
}
