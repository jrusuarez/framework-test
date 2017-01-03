"use strict";

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var userServices = require('../service/user');
var roleServices = require('../service/role');

var apiAllowAnonymous = require('../helper/apiAllowAnonymous');
var helpCrypto = require('../helper/crypto');

var services = {};

function requireLogin() {
	return async(function (req, res, next) {
		var originalUrl = req.originalUrl;
		var error=new Error("");
		if (apiAllowAnonymous.indexOf(originalUrl) > -1) {
			return next();
		}

		if (!req.headers.authorization)
		{
			error=new Error("Must have login");
			error.status=401;
			return next(error);
		}

		var arrayToken = req.headers.authorization.split(' ');

		if (arrayToken.length != 2) {
			error=new Error("Token incorrect format");
			error.status=401;
			return next(error);			
		}

		var bearer = arrayToken[0];
		var token = arrayToken[1];

		if (bearer != "Bearer") {
			error=new Error("Token incorrect format");
			error.status=401;
			return next(error);			
		}

		if (!token) {
			error=new Error("Token was empty");
			error.status=401;
			return next(error);			
		}
		token = decodeURIComponent(token);
		if (req.session.user && req.session.user[token]) {
			return next();
		}
		var userObj = await(userServices.getByToken(token).catch(function (err) {
			error.status=400;
			return next(error);			
		}));

		if (!userObj || !userObj.length) {
			error=new Error("Token is invalid");
			error.status=401;
			return next(error);	
		}

		var roles = await(roleServices.getByUserId(userObj[0].id).catch(function (err) {
			error.status=400;
			return next(error);	
		}));

		req.session.user = {};
		req.session.user[token] = userObj[0];
		req.session.user[token].roles = roles;

		return next();
	});
}

function getCurrentUser(req, token) {
	if (!token) {
		return null;
	}

	//return from session
	var user = req.session.user[token];
	if (user) {
		return user;
	}

	// var userObj = await(userServices.getByToken(token).catch(function (err) {
	// 	return res.status(400).send(err);
	// }));

	// if (!userObj || !userObj.length) {
	// 	return null;
	// }

	// var roles = await(roleServices.getByUserId(userObj[0].id).catch(function (err) {
	// 	return res.status(400).send(err);
	// }));

	// req.session.user = {};
	// req.session.user[token] = userObj[0];
	// req.session.user[token].roles = roles;

	// return userObj[0];
	return null;
}

function requireRole(role) {
	return function (req, res, next) {
		var token = helpCrypto.getTokenFromReqHeader(req.headers.authorization);
		var currentUser = getCurrentUser(req, token);
		
		if (currentUser &&
			currentUser.roles.map(function (a) { return a.name; }).every(elem => role.indexOf(elem) > -1))
			next();
		else
			res.send(403);
	}
}

services.requireLogin = requireLogin;
services.getCurrentUser = getCurrentUser;
services.requireRole = requireRole;

module.exports = services;