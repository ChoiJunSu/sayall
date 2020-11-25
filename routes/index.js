const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');


router.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
})


router.get('/', (req, res, next) => {
  return res.render('index', {user: req.user});
});

module.exports = router;
