import express, { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
let connection;

app.set("port", 8080);

app.use(bodyParser.json());
app.use(cors());
app.use("/cdn", express.static("public"));

(async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    database: "hatuvue",
    port: 3306,
    user: "user",
    password: "user",
  });

  app.route("/api/test").get((req, res) => {
    res.send("Hello world!");
  });

  app.listen(app.get("port"), () => {
    console.log("server is listening port " + app.get("port"));
  });
})();
