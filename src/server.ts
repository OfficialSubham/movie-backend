import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import userRoute from "./routes/userRoute";
import movieRoute from "./routes/movieRoute";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server working" });
});

//User specific route

app.use("/user", userRoute);

//Movie specific route

app.use("/movie", movieRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log(err);
    res.json({ message: "Some Internal Error Occured" });
  },
);

app.listen(8080);
