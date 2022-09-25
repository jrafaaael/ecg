import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import parser from './serial.js';

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

parser.on('error', (err) => {
  console.error(err);
});

parser.on('data', (chunk) => {
  const data = Number(chunk);
  io.emit('data', data);
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
