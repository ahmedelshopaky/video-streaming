import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import server from "./server/index.js";
import api from "./api/index.js";

const app = express();

config();
const MONGODB = process.env.MONGODB;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());
// app.use(
//   cors({
//     allowedHeaders: [
//       "Origin",
//       "X-Requested-With",
//       "Content-Type",
//       "Accept",
//       "X-Access-Token",
//       "Authorization",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Headers",
//       "Access-Control-Allow-Methods",
//     ],
//     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//     preflightContinue: true,
//     origin: "*",
//   })
// );

const start = () => {
  app.listen(PORT, HOST, () => {
    console.log(`starting app on ${HOST}:${PORT}`);
  });
};

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    start();
    console.log("mongoose connected successfully");
  })
  .catch(() => {
    console.log("mongoose error");
  });

app.use(fileUpload());

app.get("/", (req, res) => {
  res.status(200).json({
    data: "Hello, world!",
    message: "string",
    success: true,
  });
});

app.use("/api", api); // get the full video
app.use("/server", server); // get the video in chunks

// Not Found MW
app.use((req, res) => {
  res.status(404).json({
    data: "Not found",
    message: "invalid route",
    success: false,
  });
});

// Error MW
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    data: "Something broke",
    message: "internal server error",
    success: false,
  });
});

export default app;
