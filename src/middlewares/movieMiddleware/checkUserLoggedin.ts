import { json, NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

const KEY = process.env.KEY || "";

interface IuserJWTData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  iat?: number;
}

export const checkUserLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({ message: "Unauthorized User" });
      return;
    }
    const user = verify(token, KEY) as IuserJWTData;
    if (!user) {
      res.status(400).json({ message: "Unauthorized User" });
      return;
    }
    req.userJWTData = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};
