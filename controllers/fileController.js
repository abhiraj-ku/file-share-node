import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import File from "../models/fileModel.js";

// multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

//uploader with options to check the
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        "Invalid file type. Only JPEG, PNG, and PDF files are allowed."
      );
    }
  },

  limits: { fileSize: 100 * 1024 * 1024 }, //100mb limit
}).single("myFile");

// controller to handle fileupload
const fileUpload = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
};

export default fileUpload;
