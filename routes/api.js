'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();

// Home page route.
router.get('/all',function(req, res){
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.get('/filter/:type/:value',function(req, res){
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;

    let json = JSON.parse(data),
        lookup = '',
        resultArr = [];

    switch (req.params.type) {
      case 'tag':
        lookup = 'tags';
        break;
      case 'price':
        lookup = 'price';
        break;
      case 'level':
        lookup = 'required_level';
        break;
    }

    json.potions.forEach((el, i) => {
      if (lookup != 'tags' && el[lookup] == req.params.value) {
          resultArr.push(el);
      } else if (lookup == 'tags' && el[lookup].indexOf(req.params.value) > -1) {
          resultArr.push(el);
      }
    });

    res.send({'potions': resultArr});
  });
});

module.exports = router;
