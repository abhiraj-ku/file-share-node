import File from "../models/fileModel.js";

const showDownloadPage = async () => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render("download", { error: "Link is expired" });
    }
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      size: file.sie,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (error) {
    return res.render("download", { error: "Something went wrong." });
  }
};

export default showDownloadPage;
