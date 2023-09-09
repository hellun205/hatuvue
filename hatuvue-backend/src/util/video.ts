import { query } from "../connection";

export interface VideoData {
  id: number;
  name: string;
  description: string;
  uploadat: Date;
  author: string;
  filename: string;
  like: number[];
  dislike: number[];
  view: number;
}

export const findVideo = async (id: number): Promise<VideoData | null> => {
  try {
    const result = (await query("SELECT * FROM videos WHERE id=?", id))[0];
    return {
      ...result,
      like: JSON.parse(result.like),
      dislike: JSON.parse(result.dislike),
    };
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const searchVideoFromName = async (
  name: string
): Promise<VideoData[] | null> => {
  try {
    const result = await query(
      "SELECT * FROM videos WHERE INSTR(REPLACE(name, ' ', ''), REPLACE(?, ' ', ''))",
      name
    );
    return (result as any[]).map((row) => {
      return {
        ...row,
        like: JSON.parse(row.like),
        dislike: JSON.parse(row.dislike),
      };
    });
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const getAllVideo = async (): Promise<VideoData[] | null> => {
  try {
    const result = await query("SELECT * FROM videos");
    return (result as any[]).map((row) => {
      return {
        ...row,
        like: JSON.parse(row.like),
        dislike: JSON.parse(row.dislike),
      };
    });
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const getVideosFromOwner = async (
  owner: number
): Promise<VideoData[] | null> => {
  try {
    const result = await query("SELECT * FROM videos WHERE owner=?", owner);
    return (result as any[]).map((row) => {
      return {
        ...row,
        like: JSON.parse(row.like),
        dislike: JSON.parse(row.dislike),
      };
    });
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const createVideo = async (
  owner: number,
  name: string,
  description: string,
  author: string,
  filename: string
) => {
  try {
    await query(
      "INSERT INTO videos (owner,name,description,author,uploadat,filename) VALUES (?,?,?,?,NOW(),?)",
      owner,
      name,
      description,
      author,
      filename
    );
    console.log(
      "create video: %s,author: %s, file: %s",
      name,
      author,
      filename
    );
    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
};
