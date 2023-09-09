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

const findVideo = async (id: number): Promise<VideoData> => {
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
};

const createVideo = async (
  name: string,
  description: string,
  author: string,
  file: File
) => {
  query("");
};

export { findVideo, VideoData, createVideo };
