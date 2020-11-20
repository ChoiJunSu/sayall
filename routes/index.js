const express = require('express');
const router = express.Router();

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

/*
router.use((req, res, next) => {
  res.locals.user = req.user;

})
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  if (isLoggedIn) {
    console.log(req);
    res.render('index_is_logged_in', {user: req.user});
  } else {
    res.render('index_is_not_logged_in');
  }


});

module.exports = router;
