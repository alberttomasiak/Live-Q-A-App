var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
    title: String,
    description: String,
    moderatorID: Object,
    time: { type: Date, default: Date.now }
});

var Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
