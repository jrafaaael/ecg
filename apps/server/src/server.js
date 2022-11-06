import http from "http";
import { join } from "path";

import express from "express";
import { Server } from "socket.io";
import QRCode from "qrcode";

import { getLocalIP } from "./utils/get-local-ip.js";

const ENV = process.env.NODE_ENV ?? "development";
const IP = ENV === "production" ? getLocalIP() ?? "localhost" : "localhost";
const PORT = 8080;
const URL = `http://${IP}:${PORT}`;
const PROJECT_ROOT = process.env.PWD ?? process.cwd();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let values = [];
let length = 0;

app.use(express.static(join(process.env.PWD, "..", "client", "dist")));
app.use((_req, res, _next) => {
  res.sendFile(join(process.env.PWD, "..", "client", "dist", "index.html"));
});

app.get("/ping", (_, res) => {
  res.json({
    message: "pong",
  });
});

// setInterval(() => {
//   values.push({
//     value: Math.random() * 100,
//     date: length,
//   });

//   if (values.length == 10) {
//     io.emit("data", values);
//     values = [];
//   }

//   length++;
// }, 10);

parser.on("error", (err) => {
  console.error(err);
});

parser.on("data", (chunk) => {
  const data = Number(chunk);
  values.push({
    value: data,
    date: length,
  });

  if (values.length == 10) {
    io.emit("data", values);
    values = [];
  }

  length++;
});

server.listen(PORT, IP, () => {
  console.log(`listening on ${URL}`);

  if (IP !== "localhost") {
    QRCode.toString(URL, { type: "terminal" }, (_, url) => console.log(url));
  }
});
