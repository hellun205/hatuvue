import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>hatuvue</h1>");
});

module.exports = router;
