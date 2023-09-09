import { query } from "../connection";

const findUserFromIp = async (ip: string) => {
  try {
    const result = await query("SELECT * FROM USER WHERE ip=?", ip);
    return result[0];
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

const findUserFromId = async (id: number) => {
  try {
    const result = await query("SELECT * FROM USER WHERE id=?", id);
    return result[0];
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

const createUser = async (ip: string) => {
  try {
    await query("INSERT INTO user (ip) VALUES (?)", ip);
    console.log("created user: %s", ip);
  } catch (ex) {
    console.error(ex);
    return null;
  }
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
