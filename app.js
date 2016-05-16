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
var server = require('http').Server(app);
var io = require('socket.io')(server);


var Comment = require('./models/comment');
var Question = require('./models/question');
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
		io.emit('comment', {comment: data.comment, questionID: data.questionID});
        console.log(data.user);
        console.log(data.comment);
        console.log(data.questionID);
        console.log(data.discussionID);
        var username = data.user;
        var comment = data.comment;
        var questionID = data.questionID;
        var discussionID = data.discussionID;
      
        Comment.create({username: data.user, comment: data.comment, questionID: mongoose.Types.ObjectId(data.questionID), discussionID: mongoose.Types.ObjectId(data.discussionID)}, function(err, success){
          if(err){
            console.log(err);
          }else{
            console.log('Comment has been added to your database.');
          }
        });
	});
  
    /*socket.on('question', function(data){
      console.log("QUESTION:" + data);
      io.emit('question', {username: data.username, question: data.question, discussionID: data.discussionID});
      var username = data.username;
      var question = data.question;
      var discussionID = data.discussionID;
      console.log(username + " " + question + " " + discussionID);
      
      Question.create({username: username, question: question, discussionID: mongoose.Types.ObjectId(discussionID)}, function(err, success){
        if(err){
          console.log(err);
        }else{
          console.log('Question werd in database gezet.');
        }
      });
    });*/
	
	socket.on('disconnect', function(){
		console.log('A user has disconnected.');
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

require('./config/passport')(passport); 
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
	app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');

app.use(express.static('build'));

// required for passport
app.use(session({ secret: 'webtech2liveQandA', saveUninitialized: false, resave: false, maxAge: new Date(Date.now() + 3600000), expires: new Date(Date.now() + 3600000)})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Flash messages from session

require('./routers/index')(app, passport); // load our routes
require('./routers/discussion.js')(app, passport);
require('./models/question.js')(app, passport);
// include our router
app.use('/', require('./routers'));
app.use('/discussion', require('./routers/discussion'));

//app.use('/discussion', require('./routers/discussion'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
//app.listen(port);
//console.log('Webtech 2 live Q&A on port: ' + port);