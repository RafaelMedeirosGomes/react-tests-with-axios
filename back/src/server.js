const express = require('express');
const cors = require('cors');

const users = require('./data');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (_req, res) => {
  res.status(200).json(users);
});

app.listen(3001, () => {
  console.log('Server online on port 3001');
});
