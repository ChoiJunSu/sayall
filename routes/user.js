const express = require('express');
const router = express.Router();

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

/*
router.use((req, res, next) => {

  res.locals.user = req.user;
})

 */

// login page
router.get('/login', isNotLoggedIn, (req, res, next) => {
  console.log('/routes/login')
  res.render('login');
});

// register page
router.get('/register', isNotLoggedIn, (req, res, next) => {
  console.log('/routes/register')
  res.render('register');
});

module.exports = router;
