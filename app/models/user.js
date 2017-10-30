'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes){
    const User = Sequelize.define('user',{
        name: Sequelize.STRING,
        validate: {
            is: /^[a-z]+$/i,
            notNull: true,
            notEmpty: true
        },
        email: Sequelize.STRING,
        validate:{
            isEmail:true
        },
        username: Sequelize.STRING,
        validate:{
            is: ["^[a-z]+$",'i'],     // will only allow letters
            notNull: true,
            notEmpty: true,
        },
        hashedPassword: Sequelize.STRING,
        salt: Sequelize.STRING,
        provider: Sequelize.STRING,
        created: Sequelize.DATE,
        validate:{
            isDate: true
        }   
    },
    {
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                delete values.hashedPassword;
                delete values.salt;
                return values;
            },
            makeSalt: function() {
                return crypto.randomBytes(16).toString('base64'); 
            },
            authenticate: function(plainText){
                return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
            },
            encryptPassword: function(password, salt) {
                if (!password || !salt) {
                    return '';
                }
                salt = new Buffer(salt, 'base64');
                return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            }
        },
        associate: function(models) {
            User.hasMany(models.Article);
        }
    }
);
return User;
};