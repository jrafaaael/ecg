import express from "express";
import { Server } from "socket.io";
import http from "http";
import parser from './serial.js';

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
let values = [];

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
    date: new Date().toISOString(),
  });

  if (values.length == 10) {
    io.emit('data', values);
    values = [];
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
