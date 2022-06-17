import { AirportPriceCalculator } from "../../../src/behavioural/strategy/airport-price-calculator";
import { BeachPriceCalculator } from "../../../src/behavioural/strategy/beach-price-calculator";
import { ParkingLot } from "../../../src/behavioural/strategy/parking-lot";
import { ShoppingPriceCalculator } from "../../../src/behavioural/strategy/shopping-price-calculator";

test("Deve criar um estacionamento vazio", () => {
  const priceCalculator = new BeachPriceCalculator();
  const parkingLot = new ParkingLot("beach", 500, priceCalculator);
  expect(parkingLot.getEmptySpaces()).toBe(500);
});

test("Deve entrar um carro no estacionamento", () => {
  const priceCalculator = new BeachPriceCalculator();
  const parkingLot = new ParkingLot("beach", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  expect(parkingLot.getEmptySpaces()).toBe(499);
});

test("Deve sair um carro", () => {
  const priceCalculator = new BeachPriceCalculator();
  const parkingLot = new ParkingLot("beach", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  parkingLot.checkOut("AAA-1111", new Date("2022-01-01T15:00:00"));
  expect(parkingLot.getEmptySpaces()).toBe(500);
});

test("Deve calcular o valor que deve ser pago, R$ 10,00 por hora, o carro permaneceu 5 horas", () => {
  const priceCalculator = new ShoppingPriceCalculator();
  const parkingLot = new ParkingLot("shopping", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  const price = parkingLot.checkOut(
    "AAA-1111",
    new Date("2022-01-01T15:00:00")
  );
  expect(price).toBe(50);
});

test("Deve calcular o valor que deve ser pago na praia, R$ 20,00 por hora, o carro permaneceu 2 horas", () => {
  const priceCalculator = new BeachPriceCalculator();
  const parkingLot = new ParkingLot("beach", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  const price = parkingLot.checkOut(
    "AAA-1111",
    new Date("2022-01-01T20:00:00")
  );
  expect(price).toBe(20);
});

test("Deve calcular o valor que deve ser pago no shopping, R$ 10,00 por hora, o carro permaneceu 2 horas", () => {
  const priceCalculator = new ShoppingPriceCalculator();
  const parkingLot = new ParkingLot("shopping", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  const price = parkingLot.checkOut(
    "AAA-1111",
    new Date("2022-01-01T12:00:00")
  );
  expect(price).toBe(20);
});

test("Deve calcular o valor que deve ser pago no aeroporto, 3 horas por R$ 20,00 e depois R$ 10,00 por hora, o carro permaneceu 5 horas", () => {
  const priceCalculator = new AirportPriceCalculator();
  const parkingLot = new ParkingLot("airport", 500, priceCalculator);
  parkingLot.checkIn("AAA-1111", new Date("2022-01-01T10:00:00"));
  const price = parkingLot.checkOut(
    "AAA-1111",
    new Date("2022-01-01T15:00:00")
  );
  expect(price).toBe(40);
});
