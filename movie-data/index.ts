import { PrismaClient } from "@prisma/client";
import * as data from "./movie.json";

const moviesArray = (data as any).default || data;
const prisma = new PrismaClient();
interface IMovies {
  title: string;
  description: string;
  showtimes: string[];
  duration: string;
}

async function uploadData() {
  // const res = await prisma.movie.createMany({
  //  data: moviesArray,
  //});

  for (const movie of moviesArray) {
    const createdMovie = await prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        price: movie.price,
      },
    });

    const showTimesPromise = movie.showtimes.map((time: string) => {
      return prisma.showtimes.create({
        data: {
          movieId: createdMovie.id,
          time,
        },
      });
    });

    await Promise.all(showTimesPromise);
  }

  console.log("done");
}

uploadData();

async function deleteData() {
  const res = await prisma.movie.deleteMany();
  console.log(res);
}

//deleteData();
