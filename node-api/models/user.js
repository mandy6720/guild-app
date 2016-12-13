var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  battletag: String,
  profile: Schema.Types.Mixed
});

module.exports = mongoose.model('User', userSchema);