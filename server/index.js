const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();
const authRoutes = require("./routes/authRoutes");
const otherRoutes = require("./routes/otherRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use("/", authRoutes);
app.use("/", otherRoutes);

const options = {
  key: fs.readFileSync("/etc/ssl/private/52.51.182.219.key"),
  cert: fs.readFileSync("/etc/ssl/certs/52.51.182.219.crt"),
};

const http = require("https").createServer(options, app);
require("./socket/io")(http);

http.listen(10000, "0.0.0.0", () => {
  console.log("Serveur démarré sur le port 10000");
});
