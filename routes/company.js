const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Profile = require('../models/profile');
const Company = require('../models/company');


router.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
})

router.get('/search', isLoggedIn, async (req, res, next) => {
    try {
        const companies = await Company.findAll({});
        return res.render('company_search', {companies});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/profiles', isLoggedIn, async (req, res, next) => {
   const {companyId} = req.query;
   try {
       const company = await Company.findOne({
           where: {id: companyId}
       });
       const profiles = await Profile.findAll({
           where: {companyId}
       });
       return res.render('company_detail', {company, profiles});
   } catch (error) {
       console.error(error);
       return next(error);
    }

});



module.exports = router;