import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import fileRoute from "./routes/fileRoutes.js";
import downloadPageRoute from "./routes/dowloadpageRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 7000;
dotenv.config();
connectDb();

app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// template engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Define routes and middleware here
app.use("/api/files", fileRoute);
app.use("/files", downloadPageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
