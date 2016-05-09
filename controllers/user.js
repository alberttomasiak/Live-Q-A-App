var User = require('../models/user');

// get one user by id (req.params.id)
function getOne(req, res, next) {
    User.findOne({_id: req.params.id}, function onUserFound(err, user) {
        if(!user) {
            res.status(404).send("User not found");
        }
        console.log(discussion);
        // we return the json version with cleaned up model to the user
        res.send(user.toJSON());
    });
}
module.exports.getOne = getOne;