import express from "express";
import {
  createUser,
  existUserFromId,
  existUserFromIp,
  findUserFromId,
  findUserFromIp,
} from "../util/user";
import { isNumeric } from "../util/util";

const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const ip = req.query.ip;

  if (id) {
    const user = await findUserFromId(isNumeric(id));
    console.log(user);
    user
      ? res.status(200).json({ message: "Ok", data: user })
      : res.status(404).json({ message: "Fail" });
  } else if (ip) {
    const user = await findUserFromIp(ip.toString());
    user
      ? res.status(200).json({ message: "Ok", data: user })
      : res.status(404).json({ message: "Fail" });
  } else res.status(400).json({ message: "Fail" });
});

router.post("/create", async (req, res) => {
  const ip = req.body.ip;
  if (await existUserFromIp(ip)) {
    res.status(400).json({ message: "Fail" });
  } else {
    createUser(ip);
    res.status(201).json({ message: "Ok" });
  }
});

router.get("/exist", async (req, res) => {
  const ip = req.query.ip;
  const id = req.query.id;

  if (id) {
    const user = await existUserFromId(isNumeric(id));
    console.log(user);
    user
      ? res.status(200).json({ message: "Ok", data: user })
      : res.status(404).json({ message: "Fail" });
  } else if (ip) {
    const user = await existUserFromIp(ip.toString());
    user
      ? res.status(200).json({ message: "Ok", data: user })
      : res.status(404).json({ message: "Fail" });
  } else res.status(400).json({ message: "Fail" });
});

module.exports = router;
