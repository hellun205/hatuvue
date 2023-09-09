import express from "express";
import upload from "../upload";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    message: "Ok",
    data: {
      name: req.file?.originalname,
      type: req.file?.mimetype,
      file: req.file?.filename,
      size: req.file?.size,
    },
  });
});

module.exports = router;
