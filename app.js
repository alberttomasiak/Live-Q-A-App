// import the modules we want to use
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3030;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
// socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// socket.io
io.on('connection', function (socket) {
	var usercount = 0;
	var users = [];
	
	socket.on('connection', function (socket) {
		socket.emit('joined');
	});
	
	socket.on('comment', function (data) {
		// we tell the client to execute 'new message'
		console.log("BERICHT: " + data);
		io.emit('comment', data);
	});
	
	socket.on('addUser', function (name) {
		users.push(name);
		console.log("user "+data+" joined the discussion");
		io.emit('addUser', users);
	});
	
	/*
	// TEST FUNCTION
	// when the client emits 'new message', this listens and executes
	socket.on('key', function () {
		// we tell the client to execute 'new message'
		io.emit('key');
	});
	*/
});


//db connection
var db = require('./config/database.js');
mongoose.connect(db.url);


// Initialize cors: Cross Origin Resource Sharing
// by default, you can only request on the same domain.
// for example: only the site www.myApp.com can call www.myApp.com/api/users/....
// if you want to make a different application on another url
// or you set it up on http://localhost:5000 for example (a different port)
// then you will need to use this cors module to 'allow' cross origin calls.
//app.use(cors());

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'jade');

// host a static folder (for css files and images)
// this public folder will be hosted on the root,
// so anything you put in it will be available on '/'
app.use(express.static('build'));

// required for passport
app.use(session({ secret: 'webtech2liveQandA', saveUninitialized: false, resave: false, maxAge: new Date(Date.now() + 3600000), expires: new Date(Date.now() + 3600000)})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Flash messages from session

require('./routers/index.js')(app, passport); // load our routes
require('./routers/discussion.js')(app, passport);
require('./models/question.js')(app, passport);
// include our router
app.use('/', require('./routers'));
app.use('/discussion', require('./routers/discussion'));
app.use('/login', function(req, res){
    // dit moet ergens anders verwerkt worden, mss in een router users of mss in een aparte login router
    res.render('login');
});
app.use('/signup', function(req, res){
    // dit moet ergens anders verwerkt worden
    res.render('signup');
});
//app.use('/discussion', require('./routers/discussion'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
//app.listen(port);
//console.log('Webtech 2 live Q&A on port: ' + port);