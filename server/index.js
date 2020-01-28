const express = require('express');

const path = require('path');

const db = require('../database/index.js');

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => { console.log(`Listening on PORT: ${PORT}`); });

app.get('/initial', (req, res) => {
  const callback = (data) => {
    res.json(data);
  };

  db.getInitial(callback);
});
