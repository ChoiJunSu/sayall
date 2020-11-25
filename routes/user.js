const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');


router.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
})


// login page
router.get('/login', isNotLoggedIn, (req, res, next) => {
  return res.render('user_login');
});

// register page
router.get('/register', isNotLoggedIn, (req, res, next) => {
  return res.render('user_register');
});

module.exports = router;
