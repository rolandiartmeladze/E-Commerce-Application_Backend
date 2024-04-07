const express = require('express');
const app = express();

app.get('/app', (req, res) => {
  res.json({ message: 'This is an example endpoint!' });
});

module.exports.handler = app;
