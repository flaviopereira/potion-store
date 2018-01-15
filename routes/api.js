'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();

// Home page route.
router.get('/',function(req, res){
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
