import * as express from "express";

declare module "express-serve-static-core" {
  interface Request {
    userExist?: boolean;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }
}
