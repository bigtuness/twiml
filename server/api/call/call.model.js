'use strict';

import mongoose from 'mongoose';

var CallSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Call', CallSchema);
