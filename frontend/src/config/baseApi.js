import axios from "axios";

const host = "https://messagerie-nu.vercel.app";

export const api = axios.create({
  baseURL: host,
});
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("kento");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject("Token manquant");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
