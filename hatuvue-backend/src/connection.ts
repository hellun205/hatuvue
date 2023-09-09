import mysql, { Connection, ProcedureCallPacket } from "mysql2";
import env from "dotenv";

env.config();

const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  database: process.env.DB ?? "hatuvue",
  port: parseInt(process.env.DB_PORT ?? "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  dateStrings: ["DATE"],
});

const query = (sql: string, ...value: any[]) =>
  new Promise<any>((res, rej) => {
    if (value.map((v) => `${v}`.includes(";")).includes(true))
      rej("sql injection");

    console.log("query: %s", sql);

    connection.query(sql, value, (err, row, field) => {
      if (err) rej(err);

      res(row);
    });
  });

export { connection, query };
