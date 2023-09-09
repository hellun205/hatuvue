import express from "express";
import { createVideo, findVideo } from "../util/video";
import { isNumeric } from "../util/util";

const router = express.Router();

router.get("/", async (req, res) => {
  const id = isNumeric(req.query.id, -1);

  if (req.query.id && id != -1) {
    const video = await findVideo(id);
    video
      ? res.status(200).json({ message: "Ok", data: video })
      : res.status(404).json({ message: "Fail" });
  } else res.status(400).json({ message: "Fail" });
});

router.post("/upload", async (req, res) => {
  const { name, description, author, file, owner } = req.body;
  const result = await createVideo(owner, name, description, author, file);

  result
    ? res.status(201).json({ message: "Ok" })
    : res.status(400).json({ message: "Fail" });
});

module.exports = router;
