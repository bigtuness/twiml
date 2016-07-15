'use strict';

import _ from 'lodash';
import twilio from 'twilio';

const accountSid = 'AC41786153140c4c2e55889b822f172059';
const authToken = '3bfb4b6a5de82523f4c18ac334a058b2';
const twimlSid = 'APb7ad2e3b60740ec4bad42e3c98659238';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function getToken(req, res) {
  var capability = new twilio.Capability(accountSid, authToken);
  capability.allowClientIncoming('FRSD');
  capability.allowClientOutgoing(twimlSid);
  var token = {
    token: capability.generate()
  };
  var response = respondWithResult(res);
  return response(token);
}

export function makeCall(req, res) {
  var phoneNumber = req.body.phoneNumber;
  var callerId = req.body.callerId;

  var twiml = new twilio.TwimlResponse();

  var numberDialer = function(dial) {
    dial.number(phoneNumber);
  }

  twiml.dial({callerId : callerId}, numberDialer);

  res.set('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());

  // let twiml = new twilio.TwimlResponse();
  // twiml.say('Test call success', {
  //     voice:'woman',
  //     language:'en-gb'
  // });
  // res.set('Content-Type', 'text/xml');
  // res.status(200).send(twiml.toString());

}