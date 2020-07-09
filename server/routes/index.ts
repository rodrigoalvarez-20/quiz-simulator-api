import { Application, Request, Response, NextFunction } from "express";
import multer from "multer";
import { OK } from "http-status-codes";
import { QuestionController, UserController } from "../controllers";
import { OAuth } from "../middlewares";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resources");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const formFields = [
  { name: "questionImage", maxCount: 1 },
  { name: "answerImage", maxCount: 1 },
  { name: "inc1Image", maxCount: 1 },
  { name: "inc2Image", maxCount: 1 },
  { name: "inc3Image", maxCount: 1 },
];

const uploadQuestionImages = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 12288 },
}).fields(formFields);

class Routes {
  private BASE_ENDPOINT = process.env.BASE_ENDPOINT;
  private UserController = new UserController();
  private QController = new QuestionController();

  public routes(app: Application) {
    app.route(`${this.BASE_ENDPOINT}/`).get((req: Request, res: Response) => {
      return res.status(OK).json({ message: "Endpoint Principal de la API" });
    });

    app
      .route(`${this.BASE_ENDPOINT}/users/register`)
      .post(OAuth, this.UserController.createUserRecord);

    app
      .route(`${this.BASE_ENDPOINT}/user`)
      .post(OAuth, this.UserController.getUserRecord)
      .patch(OAuth, this.UserController.updateUserRecord);

    app
      .route(`${this.BASE_ENDPOINT}/questions/ns`)
      .post(uploadQuestionImages, this.QController.addNewNSQuestion);

    app
      .route(`${this.BASE_ENDPOINT}/questions/nms`)
      .post(uploadQuestionImages, this.QController.addNewNMSQuestion);
  }
}

export default Routes;
