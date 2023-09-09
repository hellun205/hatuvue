import { query } from "../connection";

const findVideo = async (id: number) => {
  const result = await query("SELECT * FROM videos WHERE id=?", id);
  return result[0];
};

const createVideo = async () => {};

export { findVideo };
