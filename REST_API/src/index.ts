import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors"
import networkDataRoutes from "./Routes/network"


const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.send("Welcome home. 🚀🚀🚀🚀🚀🚀🚀🚀")
);


const PORT:number = 4000

app.use("/network",networkDataRoutes)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server Started at PORT: ${PORT}`);
  });
