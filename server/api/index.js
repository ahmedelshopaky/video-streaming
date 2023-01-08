import express from "express";
import Controller from "./controller.js";

const api = express.Router();
api.post("/upload-video", Controller.uploadVideo);
api.get("/download-video", Controller.downloadVideo);

export default api;
