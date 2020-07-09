import { Request, Response, NextFunction } from "express";
import HttpException from "../middlewares/error";
import {
  OK,
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "http-status-codes";
import { INSQuestion, NSQuestion, INMSQuestion, NMSQuestion } from "../models";
import mongoose from "mongoose";
import { NMSSubjects } from "../models/exams/nmsexam";
import { NOT_FOUND } from "http-status-codes";
import { isIfStatement } from "typescript";
import { areaSubs, MSBaseSubjects } from "../models/exams/poli/nspexam";

class QuestionController {
  public addNewNMSQuestion(req: Request, res: Response, next: NextFunction) {
    const question = req.body as INMSQuestion;
    const files = req.files as any;
    question.questionImgUrl = files["questionImage"]
      ? (files["questionImage"][0].path as string)
      : "";
    question.answerImgUrl = files["answerImage"]
      ? (files["answerImage"][0].path as string)
      : "";
    question.inc1ImgUrl = files["inc1Image"]
      ? (files["inc1Image"][0].path as string)
      : "";
    question.inc2ImgUrl = files["inc2Image"]
      ? (files["inc2Image"][0].path as string)
      : "";
    question.inc3ImgUrl = files["inc3Image"]
      ? (files["inc3Image"][0].path as string)
      : "";

    question._id = new mongoose.Types.ObjectId();

    const subjects = NMSSubjects as any;

    new NMSQuestion({
      _id: question._id,
      questionImgUrl: question.questionImgUrl,
      question: question.question,
      answer: question.answer,
      answerImgUrl: question.answerImgUrl,
      inc1: question.inc1,
      inc1ImgUrl: question.inc1ImgUrl,
      inc2: question.inc2,
      inc2ImgUrl: question.inc2ImgUrl,
      inc3: question.inc3,
      inc3ImgUrl: question.inc3ImgUrl,
      subject: subjects[question.subject]["name"],
    })
      .save()
      .then((response) => {
        if (!response)
          next(
            new HttpException(
              BAD_REQUEST,
              "No se ha podido guardar la pregunta"
            )
          );
        return res
          .status(CREATED)
          .json({ message: "La pregunta ha sido creada", response });
      })
      .catch((error: Error) => {
        next(
          new HttpException(
            INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al tratar de añadir la pregunta",
            error.message
          )
        );
      });
  }

  public addNewNSQuestion(req: Request, res: Response, next: NextFunction) {
    const question = req.body as INSQuestion;
    const files = req.files as any;
    question.questionImgUrl = files["questionImage"]
      ? (files["questionImage"][0].path as string)
      : "";
    question.answerImgUrl = files["answerImage"]
      ? (files["answerImage"][0].path as string)
      : "";
    question.inc1ImgUrl = files["inc1Image"]
      ? (files["inc1Image"][0].path as string)
      : "";
    question.inc2ImgUrl = files["inc2Image"]
      ? (files["inc2Image"][0].path as string)
      : "";
    question.inc3ImgUrl = files["inc3Image"]
      ? (files["inc3Image"][0].path as string)
      : "";

    question._id = new mongoose.Types.ObjectId();

    const areaSubj = areaSubs as any;
    const baseSub = MSBaseSubjects as any;

    var subj = "";
    if (question.area) subj = areaSubj[question.area][question.subject]["name"];
    else {
      subj = baseSub[question.subject]["name"];
      question.area = "";
    }

    new NSQuestion({
      _id: question._id,
      questionImgUrl: question.questionImgUrl,
      question: question.question,
      answer: question.answer,
      answerImgUrl: question.answerImgUrl,
      inc1: question.inc1,
      inc1ImgUrl: question.inc1ImgUrl,
      inc2: question.inc2,
      inc2ImgUrl: question.inc2ImgUrl,
      inc3: question.inc3,
      inc3ImgUrl: question.inc3ImgUrl,
      university: question.university,
      area: question.area,
      subject: subj,
    })
      .save()
      .then((response) => {
        if (!response)
          next(
            new HttpException(
              BAD_REQUEST,
              "No se ha podido guardar la pregunta"
            )
          );
        return res
          .status(CREATED)
          .json({ message: "La pregunta ha sido creada", response });
      })
      .catch((error: Error) => {
        next(
          new HttpException(
            INTERNAL_SERVER_ERROR,
            "Ha ocurrido un error al tratar de añadir la pregunta",
            error.message
          )
        );
      });
  }

  public getQuestionsNMS(req: Request, res: Response, next: NextFunction) {
    var preguntas = new Array();
    Object.keys(NMSSubjects).forEach((subject: any, idx, array) => {
      const filter = { subject: { $in: subject["name"] } };
      const limit = subject["quantity"] as number;
      new Promise<INMSQuestion[]>((resolve, reject) => {
        NMSQuestion.findRandom(filter, {}, { limit }, (error, response) => {
          if (error) reject(error);
          if (!response)
            reject(
              new HttpException(
                NOT_FOUND,
                "No se han podido encontrar preguntas de 1 o mas materias solicitadas"
              )
            );
          resolve(response);
        });
      })
        .then((data) => {
          preguntas = preguntas.concat(data);
          if (idx === array.length - 1) return res.status(OK).json(preguntas);
        })
        .catch((error: Error) => {
          next(
            new HttpException(
              BAD_REQUEST,
              "Ha ocurrido un error al obtener las preguntas para el quiz",
              error.message
            )
          );
        });
    });
  }

  public getQuestionNS(req: Request, res: Response, next: NextFunction) {
    const { university, area } = req.body;
    
  }
}

export default QuestionController;
