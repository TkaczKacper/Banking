import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routers/authRouter";
import accountRouter from "./routers/accountRouter";
import moneyRouter from "./routers/moneyRouter";

const app: Application = express();
require("dotenv").config();

const server = require("http").createServer(app);

const allowedOrigins = ["http://192.168.1.100:3000", "http://localhost:3000"];
const options: cors.CorsOptions = {
   origin: allowedOrigins,
   credentials: true,
};

app.use(helmet());
app.use(cors(options));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/money", moneyRouter);

app.get("/", (req, res) => {
   res.json("hi");
});

server.listen(5000, () => {
   console.log("listening on port 5000");
});
