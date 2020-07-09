import { Request, Response, NextFunction } from "express";
import {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
  NOT_FOUND,
} from "http-status-codes";
import { UserSchema } from "../models";
import HttpException from "../middlewares/error";
import mongoose from "mongoose";

class UserController {
  public createUserRecord(req: Request, res: Response, next: NextFunction) {
    const { displayName, email } = req.body;
    UserSchema.findOne({ email })
      .exec()
      .then((response) => {
        if (response)
          return res
            .status(BAD_REQUEST)
            .json({ error: "El usuario ya ha sido registrado" });
        new UserSchema({
          _id: new mongoose.Types.ObjectId(),
          email,
          displayName,
        })
          .save()
          .then((adminSaved) => {
            if (!adminSaved)
              next(
                new HttpException(
                  INTERNAL_SERVER_ERROR,
                  "Ha ocurrido un error al procesar la solicitud"
                )
              );

            return res
              .status(CREATED)
              .json({ message: "El usuario se ha registrado exitosamente" });
          })
          .catch((errorSaved: Error) => {
            next(
              new HttpException(
                INTERNAL_SERVER_ERROR,
                "Ha ocurrido un error al tratar de registrar el usuario",
                errorSaved.message
              )
            );
          });
      })
      .catch((error: Error) => {
        next(
          new HttpException(
            INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al tratar de registrar el usuario",
            error.message
          )
        );
      });
  }

  public getUserRecord(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    UserSchema.findOne({ email })
      .exec()
      .then((user) => {
        if (!user)
          next(
            new HttpException(
              NOT_FOUND,
              "No se ha encontrado la informacion del usuario solicitado"
            )
          );

        return res.status(OK).json({
          emai: user?.email,
          results: user?.results,
          displayName: user?.displayName,
        });
      })
      .catch((error: Error) => {
        next(
          new HttpException(
            INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al obtener la informacion del usuario",
            error.message
          )
        );
      });
  }

  public updateUserRecord(req: Request, res: Response, next: NextFunction) {
    const { email, lastResult } = req.body;
    UserSchema.findOneAndUpdate(
      { email },
      { $addToSet: { results: lastResult } }
    )
      .then((result) => {
        if (!result)
          next(
            new HttpException(
              NOT_FOUND,
              "No se ha podido encontrar  el usuario solicitado"
            )
          );

        return res
          .status(OK)
          .json({ message: "Se ha actualizado correctamente" });
      })
      .catch((error: Error) => {
        next(
          new HttpException(
            INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al actualizar la informacion del usuario",
            error.message
          )
        );
      });
  }
}

export default UserController;
