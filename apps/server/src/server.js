import express from 'express';

const PORT = 8080;
const app = express();

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
