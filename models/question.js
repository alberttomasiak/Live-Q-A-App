var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	username: String,
	question: String,
	discussionID: Object
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;