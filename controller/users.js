"use strict";

var uuid = require('node-uuid');
var helper = require("../helper/crypto");
var systemRole = require('../helper/systemRole');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var _ = require('lodash');

var userServices = require('../service/user');
var tokenServices = require('../service/token');
// var appServices = require('../service/app');
var roleServices = require('../service/role');

var controller = {};

function login(req, res, next) {
    var user = await(userServices.getByUserName(req.body.email).catch(function (err) {
        return res.status(400).send(err);
    }));

    if (!user) {
        return res.status(400).send("The credential incorrect");
    }

    var userInfo = user.dataValues;

    //generate password
    var passwordGenerator = helper.generatePasswordBySaltDigitCodeHash(req.body.password, userInfo.saltDigitCodeHash);

    if (userInfo.digitCodeHash != passwordGenerator.digitCodeHash) {
        return res.status(400).send("The credential incorrect");
    }

    // //check app id
    // var app = await(appServices.getByUser(userInfo.id).catch(function (err) {
    //     return res.status(400).send(err);
    // }));

    // if (!app
    //     || !app.length
    //     || !req.body.appId
    //     || !_.some(app, function (n) { return n.dataValues.appId === req.body.appId; })) {
    //     return res.status(400).send("Please, register device before access to system");
    // }

    var acceptTokenGenerator = helper.generateToken();
    var refreshTokenGenerator = helper.generateToken();

    var expired = new Date();
    expired.setDate(expired.getDate() + 15);

    //create token
    var token = {
        id: uuid.v1(),
        acceptToken: acceptTokenGenerator.token,
        refreshToken: refreshTokenGenerator.token,
        expired: expired,
        userId: userInfo.id,
        isSignedOut: false
    };

    var tokenResult = await(tokenServices.create(token).catch(function (err) {
        return res.status(400).send(err);
    }));

    return res.status(200).send({
        id: userInfo.id,
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        acceptToken: acceptTokenGenerator.token,
        refreshToken: refreshTokenGenerator.token,
        expired: expired
    });
}

function create(req, res, next) {
    var user = await(userServices.getByUserName(req.body.email).catch(function (err) {
        return res.status(400).send(err);
    }));

    if (user) {
        return res.status(400).send("User has exists");
    }

    //generate password
    var passwordGenerator = helper.generatePassword(req.body.password);

    //prepair user
    user = {
        id: uuid.v1(),
        userName: req.body.email,
        digitCodeHash: passwordGenerator.digitCodeHash,
        saltDigitCodeHash: passwordGenerator.saltDigitCodeHash,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: false
    };

    var userResult = await(userServices.create(user).catch(function (err) {
        return res.status(400).send(err);
    }));

    //add role to user
    //var roleResult = await(roleServices.getByName(systemRole.user));

    //add role administrator to user
    var roleResult = await(roleServices.getByName(systemRole.administrator));

    var userRole = {
        id: uuid.v1(),
        userId: userResult.dataValues.id,
        roleId: roleResult.dataValues.id
    };

    var userRoleResult = await(userServices.addRoleToUser(userRole));

    return res.status(200).send({
        id: userResult.dataValues.id,
        userName: userResult.dataValues.userName,
        email: userResult.dataValues.email,
        phoneNumber: userResult.dataValues.phoneNumber,
        firstName: userResult.dataValues.firstName,
        lastName: userResult.dataValues.lastName,
        role: {
            name: roleResult.dataValues.name,
            id: roleResult.dataValues.id
        }
    });
}

function getUserDetail(req, res, next) {
    var result = await(userServices.getByUserId(req.params.id).catch(function (err) {
        return res.status(400).send(err);
    }));

    if (result) {
        result.dataValues.roles = await(roleServices.getByUserId(result.dataValues.id).catch(function (err) {
            return res.status(400).send(err);
        }));
    }

    return result ? res.status(200).send(result.dataValues) : res.status(400).send('User not found');
}

function getProfile(req, res, next) {
    var token = helper.getTokenFromReqHeader(req.headers.authorization);
    var user = req.session.user[token];
    var result;
    if (user) {
        return res.status(200).send(user);
    } else {
        var result = await(userServices.getByToken(token).catch(function (err) {
            return req.status(400).send(err);
        }));

        if (result) {
            result[0].roles = await(roleServices.getByUserId(result[0].id).catch(function (err) {
                return res.status(400).send(err);
            }));
        }
        return result ? res.status(200).send(result[0]) : res.status(400).send('User not found');
    }
}

function logout(req, res, next) {
    var token = helper.getTokenFromReqHeader(req.headers.authorization);
    var result = await(tokenServices.logout(token).catch(function (err) {
        return req.status(400).send(err);
    }))

    return result ? res.status(200).send('Logout success') : res.status(400).send('Error logout');
}

controller.login = async(login);
controller.create = async(create);
controller.getUserDetail = async(getUserDetail);
controller.getProfile = async(getProfile);
controller.logout = async(logout);

module.exports = controller;