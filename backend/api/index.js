import express from "express";
import Controller from "./controller.js";

const api = express.Router();
api.post("/upload-video", Controller.uploadVideo);

export default api;
