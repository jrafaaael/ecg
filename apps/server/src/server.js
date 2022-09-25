import express from 'express';
import parser from './serial.js';

const PORT = 8080;
const app = express();

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
  console.log(data);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
