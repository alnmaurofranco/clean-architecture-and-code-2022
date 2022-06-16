import { EnterpriseCustomerVehicleFactory } from "../../../src/creational/abstract_factory_ex2/factories/enterprise-customer-vehicle-factory";
import { IndividualCustomerVehicleFactory } from "../../../src/creational/abstract_factory_ex2/factories/individual-customer-vehicle-factory";

test("Deve criar um veiculo para o cliente individual", () => {
  const individualFactory = new IndividualCustomerVehicleFactory();
  const car = individualFactory.createVehicle("HB20", "Lucas");
  expect(car.pickUp()).toBe("HB20 está buscando Lucas para ir ao shopping");
});

test("Deve criar um veiculo para o cliente enterprise", () => {
  const enterpriseFactory = new EnterpriseCustomerVehicleFactory();
  const car = enterpriseFactory.createVehicle("IX35", "Alan");
  expect(car.pickUp()).toBe("IX35 carro Enterprise está indo buscar Alan");
});
