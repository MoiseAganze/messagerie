import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.BACKEND_HOST || "http://localhost:10000";

export const socket = io(URL, {
  withCredentials: true, // Important pour les sessions ou cookies
  transports: ["websocket"], // Évite le fallback vers "polling"
});
