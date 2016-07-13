'use strict';

import twilio from 'twilio';

function Client() {
  let accountSid = 'AC41786153140c4c2e55889b822f172059';
  let authToken = '3bfb4b6a5de82523f4c18ac334a058b2';

  return twilio(accountSid, authToken)
}

module.exports = Client;
