import { Observer } from "./observer";

export class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  register(observer: Observer) {
    this.observers.push(observer);
  }

  notify(name: string, value: string) {
    this.observers.forEach((observer) => observer.update(name, value));
  }
}
