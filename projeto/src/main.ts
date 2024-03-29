import { Broker } from "./infra/broker/broker";
import { PrismaConnectionAdapter } from "./infra/database/prisma-connection-adapter";
import { PrismaRepositoryFactory } from "./infra/factory/prisma-repository-factory";
import { ExpressAdapter } from "./infra/http/express-adapter";
import { RouteConfig } from "./infra/http/route-config";

const PORT = 3333;
const connection = new PrismaConnectionAdapter();
const repositoryFactory = new PrismaRepositoryFactory();
const expressAdapter = new ExpressAdapter();
const broker = new Broker();
new RouteConfig(expressAdapter, repositoryFactory, connection, broker);
expressAdapter.listen(PORT);
