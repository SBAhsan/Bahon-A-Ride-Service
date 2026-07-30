import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";

const app : Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(express());
app.use(express.urlencoded());
app.use(cors());


export default app;