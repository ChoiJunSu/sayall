const express = require('express');
const router = express.Router();

/*
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.use((req, res, next) => {
  res.locals.user = req.user;

})
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SAYALL' });
});

module.exports = router;
