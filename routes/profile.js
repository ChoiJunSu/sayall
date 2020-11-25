const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Profile = require('../models/profile');
const Company = require('../models/company');


router.use((req, res, next) => {
   res.locals.user = req.user;
   return next();
})


router.get('/my', isLoggedIn, async (req, res, next) => {
   const id = req.user.id;
   try {
      let profiles = await Profile.findAll({
         where: {userId: id}
      });
      if (profiles[0]) {
         for (let i=0; i<profiles.length; i++) {
            const company = await Company.findOne({
               attributes: ['name'],
               where: {id: profiles[i].companyId}
            });
            profiles[i] = profiles[i].toJSON();
            profiles[i].companyName = company.name;
         }
      }
      res.render('profile_my', {profiles});
   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.get('/register', isLoggedIn, async (req, res, next) => {
   try {
      let companies = await Company.findAll({});
      companies = companies.map(company => company.toJSON());
      return res.render('profile_register', {companies});
   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.post('/register', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   const {companyId, position, department, startDate, endDate} = req.body;
   try {
      const result = await Profile.create({
         userId,
         companyId,
         position,
         department,
         startDate,
         endDate: endDate?endDate:null
      });
      return res.render('result', {message: '프로필이 등록되었습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
   } catch (error) {
      console.error(error);
      return next(error);
   }
});


module.exports = router;