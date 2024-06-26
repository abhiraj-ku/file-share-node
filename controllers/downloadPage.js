import File from "../models/fileModel.js";
import path from "path";

const downloadFile = async (req, res) => {
  // Extract link and get file from storage send download stream
  const file = await File.findOne({ uuid: req.params.uuid });
  // Link expired
  if (!file) {
    return res.render("download", { error: "Link has been expired." });
  }
  const response = await file.save();
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
};

export default downloadFile;
