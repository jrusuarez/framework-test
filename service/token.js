"use strict";

var models  = require('../models');
var Promise = require('bluebird');

var services = {};

/**
 * get token by accept token
 * @param acceptToken
 */
function getByAcceptToken(acceptToken){
    return new Promise(function(resolve, reject){
        models.Tokens.findOne({
            where: {
                acceptToken: acceptToken
            }
        }).then(function(e){
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * get token by refresh token
 * @param refreshToken
 */
function getByRefreshToken(refreshToken) {
    return new Promise(function(resolve, reject){
        models.Tokens.findOne({
            where: {
                refreshToken: refreshToken
            }
        }).then(function(e){
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * get token by user
 * @param userId
 */
function getByUser(userId){
    return new Promise(function(resolve, reject){
        models.Tokens.findAll({
            where: {
                userId: userId
            }
        }).then(function(e){
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * create token
 * @param token
 */
function create(token){
    return new Promise(function(resolve, reject) {
        models.Tokens.create(token).then(function(e) {
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

function logout(acceptToken){
    return new Promise(function(resolve, reject) {
        models.Tokens.findOne({ 
            where: { 
                acceptToken : acceptToken 
            }
        }).then(function(token) {
            if(token){
                token.updateAttributes({
                    isSignedOut: true
                }).then(function(token){
                    resolve(token);
                });
            }

            return null;
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

services.getByAcceptToken = getByAcceptToken;
services.getByRefreshToken = getByRefreshToken;
services.getByUser = getByUser;
services.create = create;
services.logout = logout;

module.exports = services;