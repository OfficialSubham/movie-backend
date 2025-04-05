import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { string, z } from "zod";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { checkEmailExist } from "../middlewares/userMiddleware/checkEmailExist";
import { compare } from "bcryptjs";
import prisma from "../prismaClient";

const SALT = 10;
const KEY = process.env.KEY || "secret";

const userRoute = Router();

const signupSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

type IUserSignUp = z.infer<typeof signupSchema>;

//userRoute.get("/", (req, res) => {
//res.json({ message: "from user" });
//});

interface TypedRequestBogy extends Request {
  userExist?: boolean;
}

//Create User Route

userRoute.post(
  "/createuser",
  checkEmailExist,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.userExist) {
        res
          .status(400)
          .json({ message: "User already exists with this email" });
        return;
      }

      const { firstName, lastName, email, password } = req.body;
      const { success } = signupSchema.safeParse(req.body);
      if (!success) {
        res.status(400).json({ message: "Enter valid credentials" });
        return;
      }
      const hashPassword = await bcrypt.hash(password, SALT);
      const dbRes = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassword,
        },
        omit: {
          password: true,
        },
      });
      const token = sign(dbRes, KEY);

      res.json({ message: "User Created Successfully", token });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Internal Server Error" });
    }
  },
);

//Login User

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

userRoute.post("/signin", checkEmailExist, async (req, res): Promise<void> => {
  try {
    if (!req.userExist) {
      res.status(400).json({ message: "No one exists with this email" });
      return;
    }
    const { success } = loginSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Enter Valid credentials" });
      return;
    }
    const { password } = req.body;
    const authVarify = await compare(password, req.user.password);
    if (!authVarify) {
      res.status(400).json({ message: "Enter valid credentials" });
    }
    const token = sign(
      {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      },
      KEY,
    );
    res.json({ message: "User logged in Successfully", token });
  } catch (error) {}
});

export default userRoute;
