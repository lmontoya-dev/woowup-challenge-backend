import axios from "axios";
import { env } from "../config/envConfig";

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
  });
  return instance;
};

const emailApiInstance = createAxiosInstance(env.baseUrl);

export { emailApiInstance };
