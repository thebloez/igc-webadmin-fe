import axios from "axios";
import config from "../../../config/app.config";

const baseURL = config.baseURL[import.meta.env.VITE_BUILD_MODE];

export const API = axios.create({
  baseURL: baseURL.HOST,
  timeout: 60000, // 1 minute (60 seconds * 1000 milliseconds)
});