import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import prisma from "../prismaClient";
import { checkUserLoggedIn } from "../middlewares/movieMiddleware/checkUserLoggedin";

const movieRoute = Router();

//get all the movies without login

movieRoute.get("/movies", async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({});
    res.json({ message: "All Movies", movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

movieRoute.post("/book", checkUserLoggedIn, async (req, res): Promise<void> => {
  res.json({ message: "working" });
});

export default movieRoute;
