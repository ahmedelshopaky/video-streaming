import Buffer from "buffer";
import MongoClient from "mongodb";
import { config } from "dotenv";

config();
const MONGODB = process.env.MONGODB;

export default class Controller {
  static async uploadVideo(req, res) {
    try {
      MongoClient.MongoClient.connect(MONGODB, (err, client) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        const db = client.db("mydatabase");
        const bucket = new MongoClient.GridFSBucket(db, { bucketName: "videos" });
        const videoData = req.body.videoData;
        const buffer = Buffer.Buffer.from(videoData.split(",")[1], "base64");

        bucket.openUploadStream("myvideo.mp4").end(buffer, (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).send(error);
          }

          console.log(result);
          res.send(result);
          client.close();
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}
