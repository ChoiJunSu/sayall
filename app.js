const createError = require('http-errors');
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const {sequelize} = require('./models');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const companyRouter = require('./routes/company');
const requestRouter = require('./routes/request');

const app = express();

passportConfig();
sequelize.sync({
  force: false
}).then(() => {
  console.log('데이터베이스 연결 성공');
}).catch((error) => {
  console.error(error);
});

// views engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/company', companyRouter);
app.use('/request', requestRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('result', {message: '서버 오류입니다.', redirect: '/', redirectName: '메인'});
});

module.exports = app;
