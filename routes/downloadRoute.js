import express from "express";
const router = express.Router();
import downloadFile from "../controllers/showDownloadPage.js";

router.get("/:uuid", downloadFile);

export default router;
