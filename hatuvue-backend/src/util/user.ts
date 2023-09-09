import { query } from "../connection";

const findUserFromIp = async (ip: string) => {
  const result = await query("SELECT * FROM USER WHERE ip=?", ip);
  return result[0];
};

const findUserFromId = async (id: number) => {
  const result = await query("SELECT * FROM USER WHERE id=?", id);
  return result[0];
};

const createUser = async (ip: string) => {
  await query("INSERT INTO user (ip) VALUES (?)", ip);
  console.log("created user: %s", ip);
};

const existUserFromIp = async (ip: string) => {
  const result = await findUserFromIp(ip);
  return result ? true : false;
};

const existUserFromId = async (id: number) => {
  const result = await findUserFromId(id);
  return result ? true : false;
};

export {
  findUserFromId,
  findUserFromIp,
  createUser,
  existUserFromId,
  existUserFromIp,
};