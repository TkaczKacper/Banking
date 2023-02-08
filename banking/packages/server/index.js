const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routers/authRouter");
require("dotenv").config();

const server = require("http").createServer(app);

const io = new Server(server, {
   cors: {
      origin: "http://192.168.1.100:3000",
      credential: "true",
   },
});

app.use(helmet());
app.use(
   cors({
      origin: "http://192.168.1.100:3000",
      credentials: true,
   })
);
app.use(express.json());
app.use(
   session({
      secret: process.env.COOKIE_SECRET,
      credentials: true,
      name: process.env.SESSION_NAME,
      resave: true,
      saveUninitialized: false,
      cookie: {
         secure: process.env.environment === "production",
         maxAge: process.env.SESSION_LIFETIME,
         sameSite: process.env.environment === "production" ? "none" : "lax",
      },
      store: store,
   })
);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
   res.json("hi");
});

io.on("connect", (socket) => {});

server.listen(5000, () => {
   console.log("listening on port 5000");
});
