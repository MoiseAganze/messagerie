module.exports = function (http) {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connecté");

    socket.on("disconnect", () => {
      console.log("Client déconnecté");
    });

    socket.on("send_message", (data) => {
      console.log("Message reçu ", data);
      io.emit("receive_message", data);
    });
  });

  return io; // Facultatif, au cas où vous voudriez utiliser l'instance ailleurs
};
