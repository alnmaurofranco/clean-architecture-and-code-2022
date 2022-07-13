import { DefaultFreightCalculator } from "../../domain/entity/default-freight-calculator";
import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { GetOrderController } from "../controller/get-order-controller";
import { GetOrdersController } from "../controller/get-orders-controller";
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

    http.on("/orders", "get", async function (params: any, body: any) {
      const getOrdersController = new GetOrdersController(repositoryFactory);
      return getOrdersController.handle(params, body);
    });

    http.on("/orders/:code", "get", async function (params: any, body: any) {
      const getOrderController = new GetOrderController(repositoryFactory);
      return getOrderController.handle(params, body);
    });
  }
}
