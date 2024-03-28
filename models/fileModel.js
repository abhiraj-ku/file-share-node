import mongoose from "mongoose";
const fileUplaodSchema = new mongoose.Schema();

const File = new mongoose.model("File", fileUplaodSchema);

export default File;
