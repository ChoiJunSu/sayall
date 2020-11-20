const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/register', isNotLoggedIn, async (req, res, next) => {
   const {id, pw, name, phoneNumber, email} = req.body;
   try {
       const exUser = await User.findOne({
           where: {phoneNumber}
       });
       if (exUser) {
           return res.redirect('/join?error=exist');
       }
       const hash = await bcrypt.hash(pw, 12);
       await User.create({
           id,
           pw: hash,
           name,
           phoneNumber,
           email
       });
       return res.redirect('/');
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
          return res.redirect('/?loginError=${info.message}');
      }
      return req.login(user, (loginError) => {
          if (loginError) {
              console.error(loginError);
              return next(loginError);
          }
          console.log('login success');
          return res.redirect('/');
      });
   })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
