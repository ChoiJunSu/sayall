exports.isLoggedIn = (req, res, next) => {
    console.log('/routes/middlewares/isLoggedIn');
    console.log(req);
    console.log('req');
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('error', {message: '로그인이 필요합니다.'});
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    console.log('/routes/middlewares/isNotLoggedIn');
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.render('error', {message: '이미 로그인 된 상태입니다.'});
    }
    console.log('end');
};