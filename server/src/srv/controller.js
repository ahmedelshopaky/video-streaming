import path from "path";
import * as fs from "fs";

import { getFileSizeAndResolvedPath, getChunkProps } from "./../utils.js";

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
      const FILE_NAME = "file_example_MP4_480_1_5MG.mp4";
      const { fileSize, resolvedPath } = getFileSizeAndResolvedPath(
        "./uploads/" + FILE_NAME
      );
      // return res.sendFile(resolvedPath);
      const requestRangeHeader = req.headers.range;
      if (requestRangeHeader) {
        const { start, end, chunkSize } = getChunkProps(
          requestRangeHeader,
          fileSize
        );
        const readStream = fs.createReadStream(resolvedPath, { start, end });

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        });
        readStream.pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        });
        fs.createReadStream(resolvedPath).pipe(res);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}
