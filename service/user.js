"use strict";

var models  = require('../models');
var Promise = require('bluebird');

var services = {};

/**
 * get user by username
 * @param userName
 */
function getByUserName(userName){
    return new Promise(function(resolve, reject){
        models.Users.findOne({
            where: {
                userName: userName
            }
        }).then(function(e){
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * find user by id
 * @param userid
 */
function getByUserId(userId){
    return new Promise(function(resolve, reject){
        models.Users.findOne({
            where: {
                Id : userId
            }
        }).then(function(e){
            resolve(e);
        }).catch(function(err){
            reject(Error(err));
        });
    });
}

/**
 * create user
 * @param user
 */
function create(user){
    return new Promise(function(resolve, reject) {
        models.Users.create(user).then(function(e) {
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * add role to user
 * @param userRole
 * @returns {Promise}
 */
function addRoleToUser(userRole){
    return new Promise(function(resolve, reject) {
        models.UserRoles.create(userRole).then(function(e) {
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * get user by token
 * @param token
 */
function getByToken(token){
    return new Promise(function(resolve, reject) {
        models.sequelize.query('select u.* from users u join tokens t on u.Id = t.UserId where t.acceptToken = :token and t.Expired >= datetime("now") and t.isSignedOut = 0 limit 1',
            { replacements: {
                token: token
            }, type: models.sequelize.QueryTypes.SELECT }
        ).then(function(users) {
            resolve(users);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

services.getByUserName = getByUserName;
services.create = create;
services.addRoleToUser = addRoleToUser;
services.getByToken = getByToken;
services.getByUserId = getByUserId;

module.exports = services;