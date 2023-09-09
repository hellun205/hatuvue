import express from "express";
import {
  createVideo,
  findVideo,
  getAllVideo,
  getVideosFromOwner,
  searchVideoFromName,
} from "../util/video";
import { isNumeric } from "../util/util";

const router = express.Router();

router.get("/", async (req, res) => {
  let data: any;

  if (req.query.id) {
    const id = isNumeric(req.query.id, -1);
    if (id == -1) {
      res.status(400).json({ message: "Fail" });
      return;
    }
    data = await findVideo(id);
  } else if (req.query.name) {
    const videos = await searchVideoFromName(req.query.name.toString());
    if (videos?.length == 0) {
      res.status(404).json({ message: "Fail" });
      return;
    }
    data = videos;
  } else if (req.query.owner) {
    const owner = isNumeric(req.query.owner, -1);
    const videos = await getVideosFromOwner(owner);

    if (owner == -1) {
      res.status(400).json({ message: "Fail" });
      return;
    }
    if (videos?.length == 0) {
      res.status(404).json({ message: "Fail" });
      return;
    }
    data = videos;
  } else {
    const videos = await getAllVideo();

    if (videos?.length == 0) {
      res.status(404).json({ message: "Fail" });
      return;
    }
    data = videos;
  }

  data
    ? res.status(200).json({ message: "Ok", data })
    : res.status(404).json({ message: "Fail" });
});

router.post("/upload", async (req, res) => {
  const { name, description, author, file, owner, type } = req.body;
  const result = await createVideo(
    owner,
    name,
    description,
    author,
    file,
    type
  );

  result
    ? res.status(201).json({ message: "Ok" })
    : res.status(400).json({ message: "Fail" });
});

module.exports = router;
