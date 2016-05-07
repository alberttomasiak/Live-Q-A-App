var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: String,
  description: String
});


var Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;