import { UUID } from "crypto";
import { query } from "../connection";

export interface VideoData {
  id: number;
  name: string;
  description: string;
  uploadat: Date;
  author: string;
  fileuuid: UUID;
  like: number[];
  dislike: number[];
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

export const getAllVideo = async (): Promise<VideoData[] | null> => {
  try {
    const result = await query("SELECT * FROM videos");
    return (result as any[]).map((row) => {
      return {
        ...row,
        like: JSON.parse(row.like),
        disLike: JSON.parse(row.dislike),
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
  fileUuid: string
) => {
  try {
    await query(
      "INSERT INTO videos (owner,name,description,author,uploadat,fileuuid) VALUES (?,?,?,?,NOW(),?)",
      owner,
      name,
      description,
      author,
      fileUuid
    );
    console.log(
      "create video: %s,author: %s, uuid: %s",
      name,
      author,
      fileUuid
    );
    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
};
