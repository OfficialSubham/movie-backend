import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import prisma from "../prismaClient";
import { checkUserLoggedIn } from "../middlewares/movieMiddleware/checkUserLoggedin";

const movieRoute = Router();

//get all the movies without login

movieRoute.get("/movies", async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        Showtimes: true,
      },
    });
    res.json({ message: "All Movies", movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

movieRoute.post("/book", checkUserLoggedIn, async (req, res): Promise<void> => {
  try {
    const { id, quantity, showtimeId } = req.body;
    if (!id || !quantity || !showtimeId) {
      res.status(400).json({ message: "Please give movie data" });
      return;
    }
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        Showtimes: true,
      },
    });
    if (!movie) {
      res.status(400).json({ message: "movie doesnot exists" });
      return;
    }
    const time = movie.Showtimes.find((times) => times.id === showtimeId);

    if (!time) {
      res.status(400).json({ message: "Enter a valid time" });
      return;
    }

    const bookedMovie = await prisma.tickets.create({
      data: {
        userId: req.userJWTData.id,
        movieId: id,
        movieName: movie.title,
        numberOfTicket: quantity,
        showtime: time.time,
      },
    });
    res.json({ message: "Ticket book successfully", ticket: bookedMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

movieRoute.get(
  "/bookings",
  checkUserLoggedIn,
  async (req, res): Promise<void> => {
    try {
      const { id } = req.userJWTData;
      const bookedMovie = await prisma.tickets.findMany({
        where: {
          userId: id,
        },
      });

      res.json({ message: "Working", bookedMovie });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
);

movieRoute.delete(
  "/bookings/:id",
  checkUserLoggedIn,
  async (req, res): Promise<void> => {
    try {
      const { id } = req.params;
      await prisma.tickets.updateMany({
        where: {
          AND: [
            {
              id: Number(id),
            },
            {
              userId: req.userJWTData.id,
            },
          ],
        },
        data: {
          cancellation: true,
        },
      });
      res.json({
        message:
          "Your booking has been cancelled. You will get your refund shortly",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
);

export default movieRoute;
