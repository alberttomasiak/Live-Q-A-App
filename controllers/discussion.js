var Discussion = require('../models/discussion');
var Question = require('../models/question');
var Comment = require('../models/comment');
var User = require('../models/user');
var mongoose = require('mongoose');
var db = require('../config/database.js');
// create a new discussion (req.body)
function create(req, res, next) {
    console.log('Hi there');
    console.log(req.body);
    
    var title = req.body.title;
    var description = req.body.description;
    var moderatorID = req.user._id;
    
    var newDiscussion = new Discussion ({
        title: title,
        description: description,
        moderatorID: mongoose.Types.ObjectId(moderatorID)
    });
    
    newDiscussion.save();
	res.redirect("/discussion/"+ newDiscussion._id);
}
module.exports.create = create;


// render one discussion page by id (req.params.id)
function getOne(req, res, next) {
    Discussion.findOne({_id: req.params.id}, function onDiscussionFound(err, discussion) {
        if(!discussion) {
            res.status(404).send("Discussion not found");
        }
		var moderator = User.findOne({_id: discussion.moderatorID}, function(err, moderator){
			var Questions = Question.find({discussionID: discussion._id}, function(err, dataQuestions){
				var Comments = Comment.find({discussionID: discussion._id}, function(err, dataComments){
					var time = discussion.time.toString();
					var format = time.substring(4,21);
					//console.log(dataQuestions.length);
					res.render('discussion', { title: discussion.title, time: format, description: discussion.description, user: req.user, moderator: moderator.local.username, discussionID: discussion._id,
					questions: dataQuestions, comments: dataComments});
				});
			}).sort('-_id');
	   });
    });
}
module.exports.getOne = getOne;

function askQuestion(req, res, next){
	console.log(req.body);
	
	var question = req.body.question;
	var discussionID = req.body.discussionID;
	var username = req.user.local.username;
	
	var newQuestion = new Question ({
		username: username,
		question: question,
		discussionID: mongoose.Types.ObjectId(discussionID)
	});
	newQuestion.save();
	res.redirect(req.get('referer'));
}
module.exports.askQuestion = askQuestion;

function postComment(req, res, next){
	var username = req.user.local.username;
	var comment = req.body.comment;
	var questionID = req.body.questionID;
	var discussionID = req.body.discussionID;
	
	
	var newComment = new Comment ({
		username: username,
		comment: comment,
		questionID: mongoose.Types.ObjectId(questionID),
		discussionID: mongoose.Types.ObjectId(discussionID)
	});
	newComment.save();
	res.redirect(req.get('referer'));
}
module.exports.postComment = postComment;

function getDiscussions(req, res, next){
	var Discussions = Discussion.find({}, function onDiscussionsFound(err, discussionsFound){
		res.render('index', {discussions: discussionsFound, user: req.user});
	}).sort('-_id').limit(5);
}
module.exports.getDiscussions = getDiscussions;