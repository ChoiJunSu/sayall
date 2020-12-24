const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');


router.get('/', (req, res, next) => {
  return res.render('index', {});
});

module.exports = router;
