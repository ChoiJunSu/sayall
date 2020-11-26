const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Profile = require('../models/profile');
const Company = require('../models/company');


router.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
})

router.get('/send', isLoggedIn, (req, res, next) => {
    const senderId = req.user.id;
    const {receiverId, companyId} = req.query;

});

module.exports = router;