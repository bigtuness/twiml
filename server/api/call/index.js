'use strict';

var express = require('express');
var controller = require('./call.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/token', controller.getToken);
router.post('/', controller.makeCall);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
