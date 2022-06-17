import { PriceCalculator } from "./price-calculator";

type ParkingLotProps = {
  plate: string;
  checkInDate: Date;
};

export class ParkingLot {
  private parkedCars: ParkingLotProps[] = [];

  constructor(
    readonly location: string,
    readonly capacity: number,
    private readonly priceCalculator: PriceCalculator
  ) {}

  checkIn(plate: string, date: Date): void {
    this.parkedCars.push({ plate, checkInDate: date });
  }

  checkOut(plate: string, checkoutDate: Date) {
    const parkedCar = this.parkedCars.find(
      (parkedCar) => parkedCar.plate === plate
    );
    if (!parkedCar) {
      throw new Error("Carro não está no estacionamento");
    }
    this.parkedCars.splice(this.parkedCars.indexOf(parkedCar), 1);
    const parkedHours =
      (checkoutDate.getTime() - parkedCar.checkInDate.getTime()) /
      (1000 * 60 * 60);
    return this.priceCalculator.calculate(parkedHours);
  }

  getEmptySpaces(): number {
    return this.capacity - this.parkedCars.length;
  }
}
