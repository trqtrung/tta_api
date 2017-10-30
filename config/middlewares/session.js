'use strict';

var config = require('./../config'),
    session = require('express-session'),
    db = require('./../sequelize');

var sequelize = require('express-sequelize-session')(session.Store);

var sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: new sequelize(db.sequelize),
    cookie:{maxAge:1000*3600*24*7},//remember for 7 days
    secret:config.expressSessionSecret
});

module.exports = sessionMiddleware;