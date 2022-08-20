import { DomainEvent } from "./domain-event";

export interface Handler {
  name: string;
  handle(event: DomainEvent): void;
}
