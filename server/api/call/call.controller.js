'use strict';

import _ from 'lodash';
import twilio from 'twilio';

const accountSid = 'AC41786153140c4c2e55889b822f172059';
const authToken = '3bfb4b6a5de82523f4c18ac334a058b2';

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
  capability.allowClientOutgoing('APb7ad2e3b60740ec4bad42e3c98659238');
  var token = {
    token: capability.generate()
  };
  var response = respondWithResult(res);
  return response(token);
}

export function makeCall(req, res) {
  // var url = 'http://' + req.headers.host;
  // var client = twilio(accountSid, authToken);

  // client.makeCall({
  //     to: req.body.to,
  //     from: req.body.from,
  //     url: url
  // }, (err, message) => {
  //     if (err) {
  //       handleError(res, 500)(err);
  //     } else {
  //       let twiml = new twilio.TwimlResponse();
  //       twiml.say('Test call success', {
  //           voice:'woman',
  //           language:'en-gb'
  //       });
  //       res.set('Content-Type', 'text/xml');
  //       res.status(200).send(twiml.toString());
  //     }
  // });




  // var phoneNumber = req.body.phoneNumber;
  // var callerId = req.body.callerId;

  // var twiml = new twilio.TwimlResponse();
  // var numberDialer = function(dial) {
  //   dial.number(phoneNumber);
  // }
  // twiml.dial({callerId : callerId}, numberDialer);
  // res.set('Content-Type', 'text/xml');
  // res.status(200).send(twiml.toString());

  var string = '<Response><Play>https://ia902605.us.archive.org/27/items/ghost_stories_001_librivox/gs001-tales_of_treasure_anon_bd_64kb.mp3<Play></Response>';
  res.set('Content-Type', 'text/xml');
  res.status(200).send(string);

}