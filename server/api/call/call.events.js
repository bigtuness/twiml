/**
 * Call model events
 */

'use strict';

import {EventEmitter} from 'events';
import Call from './call.model';
var CallEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CallEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Call.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CallEvents.emit(event + ':' + doc._id, doc);
    CallEvents.emit(event, doc);
  }
}

export default CallEvents;
