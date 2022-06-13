const example1 = require("./example1_after");

test("Deve calcular o valor de uma corrida de taxi em dias normais", function () {
  // given (dado que, cenario) Arrange
  const distance = 1000;
  const date = new Date("2022-05-07T10:00:00");
  // when (quando algo acontecer...) Act
  const price = example1.calculateRide(distance, date);
  // then (então algo deve ser verificado...) Assert
  expect(price).toBe(2100);
});

test("Deve calcular o valor de uma corrida de taxi nos domingos", function () {
  const distance = 1000;
  const date = new Date("2022-05-08T10:00:00");
  const price = example1.calculateRide(distance, date);
  expect(price).toBe(2900);
});

test("Deve calcular o valor de uma corrida de taxi de noite", function () {
  const distance = 1000;
  const date = new Date("2022-05-07T23:00:00");
  const price = example1.calculateRide(distance, date);
  expect(price).toBe(3900);
});

test("Deve lançar uma exception se a distância for inválida", function () {
  const distance = "1000";
  const date = new Date("2022-05-07T23:00:00");
  expect(() => example1.calculateRide(distance, date)).toThrow(
    new Error("Invalid parameter distance")
  );
});

test("Deve lançar uma exception se a distância for negativa", function () {
  const distance = -1000;
  const date = new Date("2022-05-07T23:00:00");
  expect(() => example1.calculateRide(distance, date)).toThrow(
    new Error("Invalid parameter distance")
  );
});

test("Deve ser de noite", function () {
  const date = new Date("2022-05-07T23:00:00");
  const isOvernight = example1.isOvernight(date);
  expect(isOvernight).toBeTruthy();
});

test("Deve ser domingo", function () {
  const date = new Date("2022-05-08T23:00:00");
  const isSunday = example1.isSunday(date);
  expect(isSunday).toBeTruthy();
});

test("Deve lançar uma exception se a data for inválida", function () {
  const distance = 1000;
  const date = "2022-05-07T23:00:00";
  expect(() => example1.calculateRide(distance, date)).toThrow(
    new Error("Invalid parameter date")
  );
});
