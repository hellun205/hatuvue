import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const getRouter = (name: string) => require(`./routes/${name}`);

const indexRouter = getRouter("index");
const testRouter = getRouter("test");
const userRouter = getRouter("user");

app.set("port", 3000);

app.use(bodyParser.json());
app.use(cors());
app.use("/cdn", express.static("public"));

app.use("/", indexRouter);
app.use("/test", testRouter);
app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log("server is listening port " + app.get("port"));
});
