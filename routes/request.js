const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const Profile = require('../models/profile');
const Company = require('../models/company');
const Request = require('../models/request');

router.get('/send', isLoggedIn, async (req, res, next) => {
    const {receiverId, companyId} = req.query;
    try {
        const receiver = User.findOne({
            where: {id: receiverId}
        });
        return res.render('request_send', {receiverId, companyId, receiverNickname: receiver.nickname});
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
                status: "대기중"
            });
            if (result) {
                return res.render('result', {message: '요청이 전송되었습니다.', redirect: '/company/detail?companyId=' + companyId,
                    redirectName: '회사 상세정보'});
            } else {
                return res.render('result', {message: '요청이 전송되지 않았습니다.', redirect: '/company/detail?companyId=' + companyId,
                    redirectName: '회사 상세정보'});
            }
        } else {
            return res.render('result', {message: '해당 프로필이 존재하지 않습니다.', redirect: '/company/detail?companyId=' + companyId,
                                redirectName: '회사 상세정보'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/my', isLoggedIn, async (req, res, next) => {
   const userId = req.user.id;
   try {
       const sentRequests = await Request.findAll({
           include: [{
               model: User,
               as: 'receiver',
               attributes: ['nickname']
           }, {
               model: Company,
               attributes: ['name']
           }],
           where: {senderId: userId}
       });
       const receivedRequests = await Request.findAll({
           include: [{
               model: User,
               as: 'sender',
               attributes: ['nickname']
           }, {
               model: Company,
               attributes: ['name']
           }],
           where: {receiverId: userId}
       });
       return res.render('request_my', {sentRequests, receivedRequests});
   } catch (error) {
       console.error(error);
       return next(error);
   }
});

router.get('/reply/set', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const {requestId} = req.query;
    try {
        const request = await Request.findOne({
            include: [{
                model: Company,
                attributes: ['name']
            }],
            where: {
                id: requestId,
                receiverId: userId
            }
        });
        return res.render('request_reply_set', {request});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/reply/set', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const {requestId, reply} = req.body;
    try {
        const result = await Request.update({
            reply,
            status: '평가중'
        }, {
            where: {
                id: requestId,
                receiverId: userId
            }
        });
        if (result[0]) {
            return res.render('result', {message: '답변이 등록되었습니다.', redirect: '/request/my', redirectName: '내 요청'});
        } else {
            return res.render('result', {message: '답변이 등록되지 않았습니다.', redirect: '/request/my', redirectName: '내 요청'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/reply/get', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const {requestId} = req.query;
    try {
        const request = await Request.findOne({
            include: [{
                model: User,
                as: 'receiver',
                attributes: ['nickname']
            }, {
                model: Company,
                attributes: ['name']
            }],
            where: {
                id: requestId,
                senderId: userId
            }
        })
        console.log(request);
        return res.render('request_reply_get', {request});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/reject', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const {requestId} = req.query;
    try {
        const request = await Request.findOne({
            include: [{
                model: Company,
                attributes: ['name']
            }],
            where: {
                id: requestId,
                receiverId: userId
            }
        });
        return res.render('request_reject', {request});
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/reject', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const {requestId, reply} = req.body;
    try {
        const result = await Request.update({
            status: '거절됨'
        }, {
            where: {
                id: requestId,
                receiverId: userId
            }
        });
        if (result[0]) {
            return res.render('result', {message: '요청이 거절되었습니다.', redirect: '/request/my', redirectName: '내 요청'});
        } else {
            return res.render('result', {message: '요청이 거절되지 않았습니다.', redirect: '/request/my', redirectName: '내 요청'});
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;