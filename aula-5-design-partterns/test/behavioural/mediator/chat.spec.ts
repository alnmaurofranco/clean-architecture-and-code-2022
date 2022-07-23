import { Channel } from "../../../src/behavioural/mediator/channel";
import { Participant } from "../../../src/behavioural/mediator/participant";

test("Deve criar um chat entre os participantes", () => {
  const participantA = new Participant("A");
  const participantB = new Participant("B");
  const participantC = new Participant("C");
  participantA.receive(participantB, "Hello B");
  participantB.receive(participantC, "Hello C");
  expect(participantA.messages[0]).toBe("B received message from A: Hello B");
  expect(participantB.messages[0]).toBe("C received message from B: Hello C");
});

test("Deve criar uma sala de chat entre os participantes", () => {
  const participantA = new Participant("A");
  const participantB = new Participant("B");
  const participantC = new Participant("C");
  const channel = new Channel();
  channel.register(participantA);
  channel.register(participantB);
  channel.register(participantC);
  channel.broadcast(participantA, "Hello");
  channel.broadcast(participantB, "Hello");
  expect(participantA.messages[0]).toBe("A received message from A: Hello");
  expect(participantB.messages[0]).toBe("B received message from B: Hello");
});

test("Deve mandar uma mensagem de um participante para outro participante", () => {
  const participantA = new Participant("A");
  const participantB = new Participant("B");
  const participantC = new Participant("C");
  const channel = new Channel();
  channel.register(participantA);
  channel.register(participantB);
  channel.register(participantC);
  channel.message(participantA, participantB, "Hello");
  expect(participantA.messages[0]).toBe("B received message from A: Hello");
});
