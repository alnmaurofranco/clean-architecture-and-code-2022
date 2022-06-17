import { DefaultFreightCalculator } from "../../domain/entity/default-freight-calculator";
import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { PlaceOrderController } from "../controller/place-order-controller";
import { SimulateFreightController } from "../controller/simulate-freight-controller";
import { ItemsRepositoryPrisma } from "../repository/database/items-repository-prisma";
import { Http } from "./http.interface";

export class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    http.on("/orders", "post", async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory);
      return await placeOrderController.handle(params, body);
    });

    http.on("/simulate-freight", "post", async (params: any, body: any) => {
      const itemsRepository = new ItemsRepositoryPrisma();
      const freightCalculator = new DefaultFreightCalculator();
      const simulateFreightController = new SimulateFreightController(
        itemsRepository,
        freightCalculator
      );
      return await simulateFreightController.handle(params, body);
    });
  }
}
