import express from "express";
import { fileUpload, sendfileViaEmail } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", fileUpload);
router.post("/send", sendfileViaEmail);

export default router;
