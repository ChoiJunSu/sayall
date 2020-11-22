const express = require('express');
const router = express.Router();

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');


// router.use((req, res, next) => {
//   res.locals.user = req.user;
//
// })

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

module.exports = router;
