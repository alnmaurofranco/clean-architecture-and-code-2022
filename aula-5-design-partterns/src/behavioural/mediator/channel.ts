import { Participant } from "./participant";

export class Channel {
  participants: Participant[];

  constructor() {
    this.participants = [];
  }

  register(participant: Participant) {
    this.participants.push(participant);
  }

  broadcast(participantFrom: Participant, message: string) {
    this.participants.forEach((participantTo) => {
      if (participantFrom.name === participantTo.name) return;
      participantFrom.receive(participantFrom, message);
    });
  }

  message(
    participantFrom: Participant,
    participantTo: Participant,
    message: string
  ) {
    participantFrom.receive(participantTo, message);
  }
}
