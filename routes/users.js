var _ = require('lodash');
var models = require('../models');
var express = require('express');
var router = express.Router();

var userController = require('../controller/users');
var systemRole = require('../helper/systemRole');
var authService = require('../service/authen');

/**
 * @swagger
 * definitions:
 *   Token:
 *     properties:
 *       id:
 *         type: string
 *       userName:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       email:
 *         type: string
 *       acceptToken:
 *         type: string
 *       refreshToken:
 *         type: string
 *       expired:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   UserRoleResponse:
 *     properties:
 *       name:
 *         type: string
 *       id:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   UserModelResponse:
 *     properties:
 *       id:
 *         type: string
 *       userName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       roles:
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/UserRoleResponse'
 */

/**
 * @swagger
 * definitions:
 *   UserModelCreate:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 */

/**
 * @swagger
 * /api/users/token:
 *   post:
 *     description: Login and get token
 *     tags:
 *       - Accounts
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email for login
 *         in: formData
 *         required: true
 *         type: string
 *         default: admin@gmail.com
 *       - name: password
 *         description: password for login
 *         in: formData
 *         required: true
 *         type: string
 *         format: password
 *         default: Sm@rt2016
 *     responses:
 *       200:
 *         description: Return token information
 *         schema:
 *           $ref: '#/definitions/Token'
 */
router.post('/token', userController.login);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     tags:
 *       - Accounts
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object to create
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserModelCreate'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/UserModelResponse'
 */
router.post('/create', userController.create);
/**
 * @swagger
 * definitions:
 *   UserProfileModelResponse:
 *     properties:
 *       id:
 *         type: string
 *       userName:
 *         type: string
 *       digitCodeHash:
 *         type: string
 *       saltDigitCodeHash:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       isActive:
 *         type: boolean
 *       createdAt:
 *         type: dateTime
 *       updatedAt:
 *         type: dateTime
 *       roles:
 *         schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/UserRoleResponse'
 */
/**
 * @swagger
 * definitions:
 *   UserProfileModel:
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     tags:
 *       - Accounts
 *     description: user's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserProfileModel'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/UserProfileModelResponse'
 */
router.get('/profile/:id', userController.getUserDetail);
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Accounts
 *     description: get user's profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully got
 *         schema:
 *           $ref: '#/definitions/UserProfileModelResponse'
 */
router.get('/profile', userController.getProfile);
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Accounts
 *     description: logout user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully 
 */
router.post('/logout', userController.logout);

//router.post('/create', authService.requireRole([systemRole.administrator, systemRole.administrator]), userController.create);

module.exports = router;