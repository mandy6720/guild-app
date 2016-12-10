var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  user: Schema.Types.Mixed || null;
});

module.exports = mongoose.model('User', userSchema);