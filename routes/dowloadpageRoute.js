import express from "express";
const router = express.Router();
import showDownloadPage from "../controllers/showDownloadPage.js";

router.get("/:uuid", showDownloadPage);

export default router;
