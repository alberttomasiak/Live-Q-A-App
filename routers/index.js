module.exports = function(app, passport) {
	var mongoose = require('mongoose');
	var controller = require('../controllers/discussion');

    app.get('/', controller.getDiscussions);

    app.get('/login', function(req, res) {
        res.render('login.jade', { message: req.flash('loginMessage')});
    });
	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));

    app.get('/signup', function(req, res) {
        res.render('signup.jade', { message: req.flash('signupMessage') });
    });
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true // allow flash messages
	}));
	
    app.get('/u/*', isLoggedIn, function(req, res) {
        res.render('profile.jade', {
            user : req.user, // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/login');
}
