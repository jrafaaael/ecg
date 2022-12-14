import http from "http";
import { join } from "path";

import express from "express";
import { Server } from "socket.io";
import QRCode from "qrcode";

import { getLocalIP } from "./utils/get-local-ip.js";
// import { getRandomIntInclusive } from "./utils/get-random-int-inclusive.js";
import parser from "./lib/serialport.js";

const ENV = process.env.NODE_ENV ?? "development";
const IP = ENV === "production" ? getLocalIP() ?? "localhost" : "0.0.0.0";
const PORT = 8080;
const URL = `http://${IP}:${PORT}`;
const MONOREPO_APPS_ROOT = join(process.env.PWD ?? process.cwd(), "..");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let values = [];
let length = 0;

if (ENV === "production") {
  app.use(express.static(join(MONOREPO_APPS_ROOT, "client", "dist")));
  app.use((_req, res, _next) => {
    res.sendFile(
      join(MONOREPO_APPS_ROOT, "client", "dist", "index.html")
    );
  });
}

app.get("/ping", (_, res) => {
  res.json({
    message: "pong",
  });
});

// setInterval(() => {
//   values.push({
//     value: getRandomIntInclusive(200, 450),
//     date: length,
//   });

//   if (values.length === 10) {
//     io.emit("data", values);
//     values = [];
//   }

//   length++;
// }, 10);

// setInterval(() => {
//   io.emit("bpm", getRandomIntInclusive(70, 75));
// }, 5000);

parser.on("error", (err) => {
  console.error(err);
});

parser.on("data", (chunk) => {
  const [type, value] = chunk.split(":");

  if (type === "ecg") {
    const data = Number(value);

    values.push({
      value: data,
      date: length,
    });

    if (values.length === 10) {
      io.emit("data", values);
      values = [];
    }

    length++;
  } else if (type === "bpm") {
    io.emit("bpm", value);
  }
});

server.listen(PORT, IP, () => {
  console.log(`listening on ${URL}`);

  if (IP !== "localhost") {
    QRCode.toString(URL, { type: "terminal" }, (_, url) => console.log(url));
  }
});
