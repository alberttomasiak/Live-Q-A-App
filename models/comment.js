var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	username: String,
	comment: String,
	questionID: Object,
	discussionID: Object
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;