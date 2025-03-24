// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}))
const port = process.env.PORT || 3000;

app.post("/profiles/:userId/upload", upload.single('video'), (req: Request, res: Response) => {

  console.log(req.file)
  res.status(200).send({});

});

app.get("/profiles/list", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});