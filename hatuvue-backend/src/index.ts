import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const getRouter = (name: string) => require(`./routes/${name}`);

const indexRouter = getRouter("index");
const userRouter = getRouter("user");
const videoRouter = getRouter("video");

app.set("port", 3000);

app.use(bodyParser.json());
app.use(cors());
app.use("/cdn", express.static("public"));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(app.get("port"), () => {
  console.log("server is listening port " + app.get("port"));
});
