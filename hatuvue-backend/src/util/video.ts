import { UUID } from "crypto";
import { query } from "../connection";

interface VideoData {
  id: number;
  name: string;
  description: string;
  uploadAt: Date;
  author: string;
  fileUuid: UUID;
  like: number[];
  disLike: number[];
}

const findVideo = async (id: number): Promise<VideoData | null> => {
  try {
    const result = (await query("SELECT * FROM videos WHERE id=?", id))[0];
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      uploadAt: result.uploadat,
      author: result.author,
      fileUuid: result.filduuid,
      like: JSON.parse(result.like),
      disLike: JSON.parse(result.dislike),
    };
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

const createVideo = async (
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

export { findVideo, VideoData, createVideo };
