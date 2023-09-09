import multer from "multer";
import { getRandomUUID } from "./util/util";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, getRandomUUID());
  },
});

const upload = multer({ storage: storage });

export default upload;
