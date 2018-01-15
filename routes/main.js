'use strict';
const express = require('express');
const router = express.Router();

// Home page route.
router.get('/',function(req,res){
  res.sendFile('/index.html');
});

module.exports = router;
