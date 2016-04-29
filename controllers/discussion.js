var Discussion = require('../models/discussion');


// create a new discussion (req.body)
function create(req, res, next) {
    console.log('Hi there');
    console.log(req.body);
    
    var title = req.body.title;
    var description = req.body.description;
    
    var newDiscussion = new Discussion ({
        title: title,
        description: description
    });
    
    newDiscussion.save();
}
module.exports.create = create;


// get one discussion by id (req.params.id)
function getOne(req, res, next) {
    Discussion.findOne({_id: req.params.id}, function onDiscussionFound(err, discussion) {
        if(!discussion) {
            res.status(404).send("Discussion not found");
        }
        console.log(discussion);
        // we return the json version with cleaned up model to the user
        //res.send(discussion.toJSON());

        res.render('discussion', { title: discussion.title, description: discussion.description});
    });
}
module.exports.getOne = getOne;