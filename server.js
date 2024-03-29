import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import fileRoute from "./routes/fileRoutes.js";
import downloadPageRoute from "./routes/dowloadpageRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
connectDb();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// template engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Define routes and middleware here
app.use("/api/files", fileRoute);
app.use("/files", downloadPageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
