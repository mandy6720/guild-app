var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  bnet_id: Number,
  profile: Schema.Types.Mixed
});

module.exports = mongoose.model('User', userSchema);