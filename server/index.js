const express = require('express');

const cors = require('cors');

const path = require('path');

const db = require('../database/index.js');

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => { console.log(`Listening on PORT: ${PORT}`); });

// app.get('/test', (req, res) => {
//   return res.end('hi');
// });

app.get('/initial', (req, res) => {
  const callback = (data) => {
    res.json(data);
  };

  db.getInitial(callback);
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/bundle.js'));
});

// module.exports = app;
