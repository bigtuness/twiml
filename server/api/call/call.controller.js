/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/calls              ->  index
 * POST    /api/calls              ->  create
 * GET     /api/calls/:id          ->  show
 * PUT     /api/calls/:id          ->  update
 * DELETE  /api/calls/:id          ->  destroy
 */

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

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Calls
export function index(req, res) {
}

export function getToken(req, res) {
  var capability = new twilio.Capability(accountSid, authToken);
  capability.allowClientIncoming('FRSD');
  // capability.allowClientOutgoing('AC2845e550456810a56dfa460a361449b4');
  var token = {
    token: capability.generate()
  };
  var response = respondWithResult(res);
  return response(token);
}

export function makeCall(req, res) {
  var url = 'http://' + req.headers.host + '/outbound';
  var client = twilio(accountSid, authToken);

  client.makeCall({
      to: req.body.to,
      from: req.body.from,
      url: url
  }, (err, message) => {
      if (err) {
        handleError(res, 500)(err);
      } else {
        let twiml = new twilio.TwimlResponse();
        twiml.say('Test call success', {
            voice:'woman',
            language:'en-gb'
        });
        res.set('Content-Type', 'text/xml');
        res.status(200).send(twiml.toString());
      }
  });
}

// Updates an existing Call in the DB
export function update(req, res) {
}

// Deletes a Call from the DB
export function destroy(req, res) {
}
