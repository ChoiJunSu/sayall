const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const Profile = require('../models/profile');
const Company = require('../models/company');
const Request = require('../models/request');


router.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
});

router.get('/send', isLoggedIn, async (req, res, next) => {
    const {receiverId} = req.query;
    try {
        const receiver = User.findOne({
            where: {id: receiverId}
        });
        return res.render('request_send', req.query);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/send', isLoggedIn, async (req, res, next) => {
    const senderId = req.user.id;
    const {receiverId, companyId, targetName} = req.body;
    try {
        const check = await Profile.count({
            where: {
                userId: receiverId,
                companyId
            }
        });
        if (check > 0) {
            const result = await Request.create({
                senderId,
                receiverId,
                companyId,
                targetName,
            });
            return res.render('result', {message: '요청이 전송되었습니다.', redirect: '/company/detail?companyId=' + companyId,
                                redirectName: '회사 상세정보'});
        } else {
            return res.render('result', {message: '해당 프로필이 존재하지 않습니다.', redirect: '/company/detail?companyId=' + companyId,
                                redirectName: '회사 상세정보'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;