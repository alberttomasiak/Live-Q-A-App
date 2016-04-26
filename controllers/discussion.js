var Discussion = require('./../models/discussion');

// create a new discussion (req.body)
function create(req, res, next) {
    console.log('ilja');
    console.log(req.body);
    /*var title = req.body.title;
    var description = req.body.description;
    var newDiscussion = new Discussion(title, description);
    newDiscussion.save(); 
  /*newDiscussion.save(function onDiscussionSaved(err, message) {
    // we return the json version with cleaned up model to the user
    res.send(discussion.toJSON());
  });*/
}
module.exports.create = create;