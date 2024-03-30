import File from "../models/fileModel.js";

const showDownloadPage = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    console.log(file);
    if (!file) {
      return res.render("download", { error: "Link is expired" });
    }
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      filesize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (error) {
    return res.render("download", { error: "Something went wrong." });
  }
};

export default showDownloadPage;
