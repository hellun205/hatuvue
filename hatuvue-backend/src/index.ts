import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const port = 3000;

const getRouter = (name: string) => require(`./routes/${name}`);

const indexRouter = getRouter("index");
const userRouter = getRouter("user");
const videoRouter = getRouter("video");
const fileRouter = getRouter("file");

app.use(bodyParser.json());
app.use(cors());

app.use("/files", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/file", fileRouter);

server.listen(port, () => {
  console.log("server is listening port " + port);
});
