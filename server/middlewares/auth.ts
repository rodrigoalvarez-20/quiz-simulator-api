import { Request, Response, NextFunction } from "express";
import admin from "../oauth";
import { UNAUTHORIZED } from "http-status-codes";

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    req.body.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.body.authToken = null;
  }
  next();
};

const OAuth = (req: Request, res: Response, next: NextFunction) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req.body;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.body.authId = userInfo.uid;
      return next();
    } catch (ex) {
      return res.status(UNAUTHORIZED).json({ error: "Recurso no disponible" });
    }
  });
};

export default OAuth;
