export const BASE_URL = (import.meta.env.VITE_BASE_URL ||
  "http://localhost:2607/api/v1") as string;

export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:2607") as string;

export const STREAM_URL = (import.meta.env.VITE_STREAM_URL ||
  "rtmp://localhost:1935/live") as string;
