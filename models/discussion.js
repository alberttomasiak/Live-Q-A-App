var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: String,
  description: String
});
/*
discussionSchema('Title')
  .get(function () {
    // when someone requests `message.Name` give him the `message.name`
    return this.title;
  }).set(function (Title) {
    // when someone changes the `message.Name` save it to the `message.name`
    this.set('title', Title);
  });
*/
var Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion


/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: String,
  description: String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

discussionSchema.virtual('Title')
  .get(function () {
    // when someone requests `message.Name` give him the `message.name`
    return this.title;
  }).set(function (Title) {
    // when someone changes the `message.Name` save it to the `message.name`
    this.set('title', Title);
  });

discussionSchema.virtual('Description')
  .get(function () {
    // when someone requests `message.Name` give him the `message.name`
    return this.description;
  }).set(function (Description) {
    // when someone changes the `message.Name` save it to the `message.name`
    this.set('description', Description);
  });


var Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;*/