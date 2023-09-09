import multer from "multer";
import { getRandomUUID } from "./util/util";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/uploads");
  },
  filename: (req, file, cb) => {
    const split = file.mimetype.split("/");
    cb(null, `${getRandomUUID()}.${split[split.length - 1]}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
