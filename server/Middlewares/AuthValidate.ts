// const JOI = require("joi");
import JOI from "joi";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// const jwt = require("jsonwebtoken");

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const schema = JOI.object({
    name: JOI.string().min(3).max(11).required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const schema = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request" });
  }
  next();
};

const ensureAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized - Token is missing",
      success: false,
      statusCode: 403,
    });
  }

  try {
    // const token = auth.split(" ")[1];
    const decoded = jwt.verify(auth, process.env.JWT_SECRETKEY as string);
    req.user = decoded as { _id: string };
    next();
  } catch (err: any) {
    return res
      .status(403)
      .json({ message: err.message, success: false, statusCode: 403 });
  }
};

export { signUpValidation, loginValidation, ensureAuthenticated };
