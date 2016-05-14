module.exports = function(app, passport) {
var controller = require('../controllers/discussion');
var express = require('express');
//var router = express.Router();

app.get('/discussion/create', isLoggedIn, function(req, res){
    // paginas renderen moet eigenlijk in controlller
    res.render('discussionCreate.jade');
});
	
app.post('/discussion/create', controller.create);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.remove);
app.get('/discussion/:id', controller.getOne);

app.post('/discussion/askQuestion', controller.askQuestion);
app.post('/discussion/postComment', controller.postComment);

//module.exports = app;


};



// middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};