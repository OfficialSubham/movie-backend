import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../../prismaClient";

export const checkEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Enter valid credentials" });
    return;
  }
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
