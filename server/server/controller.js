import path from "path";
import * as fs from "fs";

export default class Controller {
  static async uploadVideo(req, res) {
    try {
      const sampleFile = req.files.sampleFile;
      const uploadPath = path.resolve(
        "./uploads",
        Date.now() + "-" + sampleFile.name
      );
      await sampleFile.mv(uploadPath);
      res.status(200).json({
        message: "File uploaded!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  static async downloadVideo(req, res) {
    try {
      const fileName = "production.mp4";
      const filePath = path.resolve("./uploads/" + fileName);
      const videoSize = fs.statSync(filePath).size;
      const range = req.headers.range;
      if (range) {
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const videoStream = fs.createReadStream(filePath, { start, end });
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": CHUNK_SIZE,
          "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        videoStream.pipe(res);
        return;
      }

      const headers = {
        "Content-Length": videoSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
      return;
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}
