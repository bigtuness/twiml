'use strict';

var express = require('express');
var controller = require('./call.controller');
var twilio = require('twilio');

var router = express.Router();

router.get('/token', controller.getToken);
router.post('/connect', twilio.webhook({validate: false}), controller.makeCall);

module.exports = router;
