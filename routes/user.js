const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');


router.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

// register page
router.get('/register', isNotLoggedIn, (req, res, next) => {
  return res.render('user_register');
});

router.get('/edit', isLoggedIn, (req, res, next) => {
  return res.render('user_edit');
});

router.post('/edit', isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  const {pw, name, email} = req.body;
  try {
    if (pw) {
      const hash = await bcrypt.hash(pw, 12);
      const result = await User.update({
        pw: hash,
        name,
        email
      }, {
        where: {id: userId}
      });
    } else {
      const result = await User.update({
        name,
        email
      }, {
        where: {id: userId}
      });
    }
    return res.render('result', {message: '회원정보가 수정되었습니다.', redirect: '/', redirectName: '메인'});
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
