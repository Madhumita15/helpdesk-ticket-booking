const cloudinary = require("../config/cloudinary.config");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "helpdesk-tick-booking",
    public_id: (req, file) => {
      const uniqueId = `${file.originalname.split(",")[0]}-${Date.now()}`;
      return uniqueId;
    },
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const FILTER_TYPE = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (FILTER_TYPE.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, new Error("only images are allowed"));
    }
  },
});

module.exports = upload;
