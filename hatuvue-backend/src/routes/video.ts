import express from "express";
import { findVideo } from "../util/video";
import { isNumeric } from "../util/util";
import upload from "../upload";

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

module.exports = router;
