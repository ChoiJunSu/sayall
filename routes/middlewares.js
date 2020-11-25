exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.render('result', {message: '로그인이 필요합니다.', redirect: '/', redirectName: '메인'});
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        return res.render('result', {message: '이미 로그인 된 상태입니다.', redirect: '/', redirectName: '메인'});
    }
};