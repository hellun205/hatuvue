import express, { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const getRouter = (name: string) => require(`../routes/${name}`);

const indexRouter = getRouter("index");
const testRouter = getRouter("test");

let connection;

app.set("port", 3000);

app.use(bodyParser.json());
app.use(cors());
app.use("/cdn", express.static("public"));

app.use("/", indexRouter);
app.use("/test", testRouter);

(async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    database: "hatuvue",
    port: 3306,
    user: "user",
    password: "user",
  });

  app.listen(app.get("port"), () => {
    console.log("server is listening port " + app.get("port"));
  });
})();
