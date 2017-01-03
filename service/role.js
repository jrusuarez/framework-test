"use strict";

var models  = require('../models');
var Promise = require('bluebird');

var services = {};

/**
 * get role by name
 * @param name
 * @returns {Promise}
 */
function getByName(name){
    return new Promise(function(resolve, reject){
        models.Roles.findOne({
            where: {
                name: name
            }
        }).then(function(e){
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * create role
 * @param role
 * @returns {Promise}
 */
function create(role){
    return new Promise(function(resolve, reject) {
        models.Roles.create(role).then(function(e) {
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * delete role by id
 * @param id
 * @returns {Promise}
 */
function deleteById(id){
    return new Promise(function(resolve, reject) {
        models.Roles.destroy({
            where: {
                id: id
            }
        }).then(function(e) {
            resolve(e);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

/**
 * get all role by userId
 * @param userId
 * @returns {Promise}
 */
function getByUserId(userId){
    return new Promise(function(resolve, reject) {
        models.sequelize.query('select r.id, r.name from UserRoles ur join Roles r on ur.roleId = r.Id where ur.userId = :userId',
            { replacements: {
                userId: userId
            }, type: models.sequelize.QueryTypes.SELECT }
        ).then(function(roles) {
            resolve(roles);
        }).catch(function (err) {
            reject(Error(err));
        });
    });
}

services.getByName = getByName;
services.create = create;
services.deleteById = deleteById;
services.getByUserId = getByUserId;

module.exports = services;