import mysql, { Connection, ProcedureCallPacket } from "mysql2";
import env from "dotenv";

env.config();

const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  database: process.env.DB ?? "hatuvue",
  port: parseInt(process.env.DB_PORT ?? "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PW,
});

const error = (message: any) => {
  console.error(`query error: ${message}`);
  return message;
};

const query = (sql: string, ...value: string[]) =>
  new Promise<
    | mysql.OkPacket
    | mysql.RowDataPacket[]
    | mysql.ResultSetHeader[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket[]
    | mysql.ProcedureCallPacket
  >((res, rej) => {
    if (sql.includes(";")) rej(error("sql injection"));

    console.log("query: %s", sql);

    connection.query(sql, value, (err, row, field) => {
      if (err) rej(error(err));

      res(row);
    });
  });

export { connection, query };