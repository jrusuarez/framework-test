var _ = require('lodash');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

var roleController = require('../controller/roles');

/**
 * @swagger
 * /api/roles/create:
 *   post:
 *     tags:
 *       - Roles
 *     description: Creates roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/create', roleController.create);

module.exports = router;