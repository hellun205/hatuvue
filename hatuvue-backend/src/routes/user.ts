import express from "express";
import {
  createUser,
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
  if (await existUserFromIp(req.ip)) {
    res.status(400).json({ message: "Fail" });
  } else {
    createUser(req.ip);
    res.status(201).json({ message: "Ok" });
  }
});

module.exports = router;
