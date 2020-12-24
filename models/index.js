'use strict';

const Sequelize = require('sequelize');
const User = require('./user');
const Company = require('./company');
const Profile = require('./profile');
const Request = require('./request');
const Rating = require('./rating');

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config')['database'][env];
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
db.sequelize = sequelize;

db.User = User;
db.Company = Company;
db.Profile = Profile;
db.Request = Request;
db.Rating = Rating;

User.init(sequelize);
Company.init(sequelize);
Profile.init(sequelize);
Request.init(sequelize);
Rating.init(sequelize);

User.associate(db);
Company.associate(db);
Profile.associate(db);
Request.associate(db);
Rating.associate(db);

module.exports = db;
