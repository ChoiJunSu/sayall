const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Profile = require('../models/profile');
const Company = require('../models/company');


router.use((req, res, next) => {
   res.locals.user = req.user;
   return next();
});


router.get('/my', isLoggedIn, async (req, res, next) => {
   const id = req.user.id;
   try {
      let profiles = await Profile.findAll({
         include: [{
            model: Company,
            attributes: ['name']
         }],
         where: {userId: id}
      });
      for (let i=0; i<profiles.length; i++) {
         profiles[i] = profiles[i].toJSON();
         if (!profiles[i].endDate) {
            profiles[i].endDate = '재직중';
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
      const companies = await Company.findAll({});
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
      if (result) {
         return res.render('result', {message: '프로필이 등록되었습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      } else {
         return res.render('result', {message: '프로필이 등록되지 않았습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      }

   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.get('/edit', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   const {profileId} = req.query;
   try {
      let profile = await Profile.findOne({
         include: [{
            model: Company,
            attributes: ['name']
         }],
         where: {
            id: profileId,
            userId
         }
      });
      return res.render('profile_edit', {profile});
   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.post('/edit', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   const {profileId, position, department, startDate, endDate} = req.body;
   try {
      const result = await Profile.update({
         position,
         department,
         startDate,
         endDate: endDate?endDate:null
      }, {
         where: {
            id: profileId,
            userId
         }
      });
      if (result[0]) {
         return res.render('result', {message: '프로필이 수정되었습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      } else {
         return res.render('result', {message: '프로필이 수정되지 않았습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      }
   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.get('/delete', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   const {profileId, confirm} = req.query;
   if (!confirm) {
      return res.render('profile_delete', {profileId});
   }
   try {
      const result = await Profile.destroy({
         where: {
            id: profileId,
            userId
         }
      });
      if (result[0]) {
         return res.render('result', {message: '프로필이 삭제되었습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      } else {
         return res.render('result', {message: '프로필이 삭제되지 않았습니다.', redirect: '/profile/my', redirectName: '내 프로필'});
      }
   } catch (error) {
      console.error(error);
      return next(error);
   }
});

router.get('/detail', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   const {profileId} = req.query;
   try {
      let profile = await Profile.findOne({
         include: [{
            model: Company,
            attributes: ['name']
         }],
         where: {
            id: profileId,
            userId
         }
      });
      profile = profile.toJSON();
      if (!profile.endDate) {
         profile.endDate = '재직중';
      }
      return res.render('profile_detail', {profile});
   } catch (error) {
      console.error(error);
      return next(error);
   }
});


module.exports = router;