import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import fileRoute from "./routes/fileRoutes.js";

const app = express();
dotenv.config();
connectDb();
const PORT = process.env.PORT;

// Define routes and middleware here
app.use("/api/files", fileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
