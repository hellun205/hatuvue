import express from "express";
import upload from "../upload";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.send({ message: "Ok", data: req.file });
});

module.exports = router;
