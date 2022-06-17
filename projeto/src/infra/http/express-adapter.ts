import express, { Application, Request, Response } from "express";
import { Http } from "./http.interface";

export class ExpressAdapter implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (request: Request, response: Response) => {
      const output = await fn(request.params, request.body);
      response.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}
