import { DefaultFreightCalculator } from "../../domain/entity/default-freight-calculator";
import { RepositoryFactory } from "../../domain/factory/repository-factory";
import { Broker } from "../broker/broker";
import { GetOrderController } from "../controller/get-order-controller";
import { GetOrdersController } from "../controller/get-orders-controller";
import { PlaceOrderController } from "../controller/place-order-controller";
import { SimulateFreightController } from "../controller/simulate-freight-controller";
import { Connection } from "../database/connection.interface";
import { ItemsRepositoryPrisma } from "../repository/database/items-repository-prisma";
import { Http } from "./http.interface";

export class RouteConfig {
  constructor(
    http: Http,
    repositoryFactory: RepositoryFactory,
    connection: Connection,
    broker: Broker
  ) {
    http.on("/orders", "post", async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(
        repositoryFactory,
        broker
      );
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
      const getOrderController = new GetOrderController(connection);
      return getOrderController.handle(params, body);
    });
  }
}
