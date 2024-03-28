import express from "express";
import fileUpload from "../controllers/fileController.js";

const router = express.Router();

router.post("/", fileUpload);

export default router;
