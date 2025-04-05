import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const checkEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    req.user = user;
    req.userExist = true;
  } else {
    req.userExist = false;
  }
  next();
};
