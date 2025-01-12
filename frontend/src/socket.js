import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://34.252.176.174:10000";

export const socket = io(URL, {
  withCredentials: true, // Important pour les sessions ou cookies
  transports: ["websocket"], // Évite le fallback vers "polling"
});
