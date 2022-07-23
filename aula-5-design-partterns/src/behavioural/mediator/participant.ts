export class Participant {
  messages: string[];

  constructor(readonly name: string) {
    this.messages = [];
  }

  receive(participant: Participant, message: string) {
    this.messages.push(
      `${participant.name} received message from ${this.name}: ${message}`
    );
  }
}
