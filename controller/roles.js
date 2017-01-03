"use strict";

var uuid = require('node-uuid');
var systemRole = require('../helper/systemRole');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var roleServices = require('../service/role');

var controller = {};

function create(req, res, next){
    //create user role
    var userRoleResult = await(roleServices.getByName(systemRole.user));
    console.log("userRoleResult",userRoleResult);
    if(!userRoleResult){
        var role = {
            id: uuid.v1(),
            name: systemRole.user
        };
        roleServices.create(role);
    }

    //create admin role
    var adminRoleResult = await(roleServices.getByName(systemRole.administrator));
    console.log("adminRoleResult",adminRoleResult);
    if(!adminRoleResult){
        var role = {
            id: uuid.v1(),
            name: systemRole.administrator
        };

        roleServices.create(role);
    }

    return res.status(200).send();
}

controller.create = async(create);

module.exports = controller;