// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import multer from 'multer';
import { createPerson, getRandomProfile, updatePerson } from "./db/queries";
import path from "path";
import fs from 'fs';

const upload = multer({ dest: 'uploads/' })
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}))
const port = process.env.PORT || 3000;

app.post("/profiles/:id/upload", upload.single('media'), (req: Request, res: Response) => {
  updatePerson(parseInt(req.params.id), {greeting:JSON.stringify(req.file)})
  res.status(200).send({});
});

app.post("/profiles/create", async (req: Request, res: Response) => {
  const {name, gender, interest} = req.body;
  if(!name || !gender || !interest) {
    res.status(400).send({});
    return;
  }
  const person = await createPerson({first_name: name, gender, interest});
  res.status(200).send({succes: true, data: person});
});

app.get("/profiles/list_random", async (req: Request, res: Response) => {
  const person = await getRandomProfile();
  res.status(200).send({success: true, data: person});
});

app.get('/video/:name', (req, res) => {
  const videoPath = `uploads/${req.params.name}` // Replace with your video path
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});