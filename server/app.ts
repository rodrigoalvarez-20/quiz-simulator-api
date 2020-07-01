import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import * as mongoose from "mongoose";
import { NOT_FOUND, OK } from "http-status-codes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    //this.router.routes(this.app);
    //this.app.use(errorHandler);
    this.app.use("/", (req: express.Request, res: express.Response) => {
      return res
        .status(OK)
        .json({ message: "Servidor correctamente iniciado" });
    });

    this.app.use("*", (req: express.Request, res: express.Response) => {
      return res
        .status(NOT_FOUND)
        .json({ error: "No se ha encontrado el recurso solicitado" });
    });
  }
}

export default new App().app;
