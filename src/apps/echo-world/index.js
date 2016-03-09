#!/usr/bin/env node

var express = require('express');
var app = express();
const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Echo World API!');
});


app.get('/world', function (req, res) {
  res.send(JSON.stringify(process.env, null, 2));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
