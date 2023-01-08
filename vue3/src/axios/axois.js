import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000000000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;