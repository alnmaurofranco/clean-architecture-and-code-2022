import { PrismaRepositoryFactory } from "./infra/factory/prisma-repository-factory";
import { ExpressAdapter } from "./infra/http/express-adapter";
import { RouteConfig } from "./infra/http/route-config";

const PORT = 3333;
const repositoryFactory = new PrismaRepositoryFactory();
const expressAdapter = new ExpressAdapter();
new RouteConfig(expressAdapter, repositoryFactory);
expressAdapter.listen(PORT);
