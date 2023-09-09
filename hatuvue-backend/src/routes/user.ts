import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const id = req.query.id;
  const ip = req.query.ip;

  if (id) {
  } else if (ip) {
  }
});

module.exports = router;
