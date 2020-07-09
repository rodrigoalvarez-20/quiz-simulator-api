import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares";
import Routes from "./routes";
import { NOT_FOUND } from "http-status-codes";
import fs from "fs";

class App {
  public app: express.Application;
  private Routes: Routes;
  constructor() {
    this.app = express();
    dotenv.config();
    // this.createResourcesFolder();
    this.Routes = new Routes();
    this.config();
    this.configMongo();
  }

  private createResourcesFolder() {
    if (!fs.existsSync("/resources")) fs.mkdirSync("/resources");
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.Routes.routes(this.app);
    this.app.use(errorHandler);
    this.app.use("*", (req: Request, res: Response) => {
      return res
        .status(NOT_FOUND)
        .json({ error: "No se ha encontrado el recurso solicitado" });
    });
  }

  private configMongo() {
    const DB_URL = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PWD}@qscluster.wtope.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`;
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

export default new App().app;
