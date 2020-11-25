const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    }, async (id, pw, done) => {
        try {
            const exUser = await User.findOne({
                where: {id}
            });
            if (exUser) {
                const result = await bcrypt.compare(pw, exUser.pw);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '존재하지 않는 아이디입니다.'});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};