import { DomainEvent } from "./domain-event";
import { Handler } from "./handler";

export class Broker {
  handlers: Handler[];

  constructor() {
    this.handlers = [];
  }

  register(handler: Handler) {
    this.handlers.push(handler);
  }

  publish(event: DomainEvent) {
    this.handlers.forEach((handler) => {
      if (handler.name === event.name) {
        handler.handle(event);
      }
    });
  }
}
