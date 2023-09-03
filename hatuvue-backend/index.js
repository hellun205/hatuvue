const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

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
  app.listen(app.get("port"), () => {
    console.log("server is listening port " + app.get("port"));
  });
})();
