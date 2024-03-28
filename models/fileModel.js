import mongoose from "mongoose";
const fileUplaodSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    sender: String,
    reciever: String,
  },
  { timestamps: true }
);

const File = new mongoose.model("File", fileUplaodSchema);

export default File;
