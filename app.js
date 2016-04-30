// import the modules we want to use
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var cors = require('cors');

// create an application
var app = express();

// connect to our database
mongoose.connect('mongodb://localhost/liveQandA');

// Initialize cors: Cross Origin Resource Sharing
// by default, you can only request on the same domain.
// for example: only the site www.myApp.com can call www.myApp.com/api/users/....
// if you want to make a different application on another url
// or you set it up on http://localhost:5000 for example (a different port)
// then you will need to use this cors module to 'allow' cross origin calls.
//app.use(cors());

// register jade as our view engine,
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// host a static folder (for css files and images)
// this public folder will be hosted on the root,
// so anything you put in it will be available on '/'
app.use(express.static('build'));

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


app.listen(3030, function () {
  console.log('Example app listening on port 3000!');
});
