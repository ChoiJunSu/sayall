const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const Profile = require('../models/profile');
const Company = require('../models/company');


router.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
});

router.get('/register', isLoggedIn, (req, res, next) => {
    return res.render('company_register');
});

router.post('/register', isLoggedIn, async (req, res, next) => {
    const {companyName} = req.body;
    try {
        const exCompany = await Company.count({
            where: {name: companyName}
        });
        if (exCompany > 0) {
            return res.render('result', {message: '이미 존재하는 회사입니다.', redirect: '/', redirectName: '메인'});
        } else {
            const result = await Company.create({
                name: companyName
            });
            return res.render('result', {message: '회사가 등록되었습니다.', redirect: '/', redirectName: '메인'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/search', isLoggedIn, async (req, res, next) => {
    try {
        const companies = await Company.findAll({});
        return res.render('company_search', {companies});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/detail', isLoggedIn, async (req, res, next) => {
   const {companyId} = req.query;
   try {
       const company = await Company.findOne({
           where: {id: companyId}
       });
       const profiles = await Profile.findAll({
           include: [{
               model: User,
               attributes: ['nickname']
           }],
           where: {companyId}
       });
       return res.render('company_detail', {company, profiles});
   } catch (error) {
       console.error(error);
       return next(error);
    }

});



module.exports = router;