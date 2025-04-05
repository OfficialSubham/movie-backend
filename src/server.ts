import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server working" });
});

//User specific route

app.use("/user", userRoute);

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
