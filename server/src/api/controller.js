import Buffer from "buffer";
import mongoose from "mongoose";

export default class Controller {
  static async uploadVideo(req, res) {
    try {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "videos",
      });
      const videoData = req.body.videoData;
      const buffer = Buffer.Buffer.from(videoData.split(",")[1], "base64");

      bucket.openUploadStream("myvideo.mp4").end(buffer, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error });
        }

        console.log(result);
        res.status(200).json({ result });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  }

  static async downloadVideo(req, res) {
    try {
      // Create a new GridFSBucket instance
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "videos",
      });

      const name = "myvideo.mp4";
      // Open a download stream
      const downloadStream = bucket.openDownloadStreamByName(name);
      // Set the file name and content type
      res.set("Content-Disposition", 'attachment; filename="myvideo.mp4"');
      res.set("Content-Type", "text/plain");
      // Pipe the file data to the response
      downloadStream.pipe(res);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err });
    }
  }
}
