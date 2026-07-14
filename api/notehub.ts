import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!API_TOKEN) {
  console.error(
    "⚠️ Warning: VITE_TMDB_TOKEN is not defined in your .env file!",
  );
}

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

notehubApi.interceptors.request.use((config) => {
  if (API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN.trim()}`;
  }
  return config;
});

export default notehubApi;
