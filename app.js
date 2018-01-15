'use strict';
const express = require('express');
const app = express();

const mainRoutes = require('./routes/main.js');
const apiRoutes = require('./routes/api.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public/dist'));
app.use('/', mainRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
