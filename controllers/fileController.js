import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import File from "../models/fileModel.js";
import { sendEmail } from "../services/sendEmail.js";
import htmlTemplate from "../services/htmlEmailTemplate.js";

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
export const sendfileViaEmail = async (req, res) => {
  const { uuid, emailTo, emailFrom, expiresIn } = req.body;

  if (!uuid || !emailFrom || !emailTo) {
    return res
      .status(422)
      .send({ error: "All fields are required except expiry" });
  }

  try {
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      return res.status(422).send({ error: "Email already sent" });
    }

    file.sender = emailFrom;
    file.reciever = emailTo;

    const response = await file.save();
    //send email

    sendEmail({
      from: emailFrom,
      to: emailTo,
      subject: "Shareit file sharing",
      text: `${emailFrom} shared a file with you`,
      html: htmlTemplate({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
        size: parseInt(file.size / 1000) + "KB",
        expires: "24hr",
      }),
    })
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Error in email sending." });
      });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
