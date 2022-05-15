import multer from "multer";

import path from "path";
const publicRoot = "../vueauthclient/static";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, publicRoot);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
export default multer({ storage });
