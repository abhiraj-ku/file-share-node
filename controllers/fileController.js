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
export const fileUpload = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).send({ error: "File upload failed" });
      }

      // File validation
      if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
      }

      // Save file details to the database
      const file = new File({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size,
      });

      const savedFile = await file.save();

      // Return the file URL to the client
      res.json({
        fileUrl: `${process.env.APP_BASE_URL}/files/${savedFile.uuid}`,
      });
    });
  } catch (error) {
    console.error("File upload controller error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// send email to download the file
// export const
