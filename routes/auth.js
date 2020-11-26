const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();
const {Op} = require('sequelize');


router.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
})


router.post('/register', isNotLoggedIn, async (req, res, next) => {
   const {id, pw, name, phoneNumber, email} = req.body;
   try {
       const exUser = await User.findOne({
           where: {[Op.or]: [{id}, {phoneNumber}]}
       });
       if (exUser) {
           return res.render('result', {message: '해당 정보로 가입된 회원이 존재합니다.', redirect: '/user/register', redirectName: '회원가입'});
       }
       const hash = await bcrypt.hash(pw, 12);
       const result = await User.create({
           id,
           pw: hash,
           name,
           phoneNumber,
           email
       });
       return res.render('result', {message: '회원가입 되었습니다.', redirect: '/', redirectName: '메인'});
   } catch (error) {
       console.error(error);
       return next(error);
   }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
          console.error(authError);
          return next(authError);
      }
      if (!user) {
          return res.render('result', {message: '로그인 오류입니다.', redirect: '/', redirectName: '메인'});
      }
      return req.login(user, (loginError) => {
          if (loginError) {
              console.error(loginError);
              return next(loginError);
          }
          return res.redirect('/'); // login success
      });
   })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
});

module.exports = router;
