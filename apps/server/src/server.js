import express from "express";
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import parser from './serial.js';

const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let values = [];
let length = 0;

app.use(
  express.static(join(__dirname, "..", "..", "client", "dist"))
);

app.use((_req, res, _next) => {
  res.sendFile(join(__dirname, "..", "..", "client", "dist", "index.html"));
});

app.get("/ping", (_, res) => {
  res.json({
    message: "pong",
  });
});

parser.on('error', (err) => {
  console.error(err);
});

parser.on('data', (chunk) => {
  const data = Number(chunk);
  values.push({
    value: data,
    date: length,
  });

  if (values.length == 10) {
    io.emit('data', values);
    values = [];
  }

  length++;
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
