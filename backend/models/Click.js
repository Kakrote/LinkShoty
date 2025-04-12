const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Click', clickSchema);
