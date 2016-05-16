// SOCKET.IO SCRIPT CLIENT
$( document ).ready(function() {
	var socket = io();

	// declare variables
	var formComment = $('#postComment'); // form comments
	var btnComment = $('#commentSubmit'); // submit button comments
	var inputComment = $('#placeComment'); // input field comments
	var loggedInUser = $('#currentUsername').val(); // username of logged in user
    var formQuestion = ("#askQuestion");
	// TEST FUNCTION
	/*
	$('html').keydown(function() {
		//alert( "Handler for .keydown() called." );
		socket.emit('key');
	});
	socket.on('key', function () {
		//alert('Key pressed');
		console.log('Key pressed');
	});
	*/
	
	socket.on('addUser', function(data){
		console.log('Watching ' + data);
	});
  
	socket.on('join', function(){
		socket.emit('addUser', loggedInUser);
	});
	
  
  // QUESTIONS met sockets in jade
    /*
     <!--
        $("#askQuestion").submit(function(){
          var user = "#{user.local.username}";
          var questionDetails = {
            username: user,
            question: $('.askQuestion').val(),
            discussionID: $("#discussionID").val()
          };
          socket.emit('question', questionDetails);
          $('.askQuestion').val('');
          return false;
        });
        
        socket.on('question', function(data){
          var username = data.username;
          var question = data.question;
          var discussionID = data.discussionID;
          $('.content').prepend('<div class="thread"><div class="thread__question"><div class="comment comment--question"><img class="comment__profilepic" src="https://s3.amazonaws.com/uifaces/faces/twitter/whale/48.jpg" alt=""><a class="comment__author">'+username+'</a><span class="comment__text">'+question+'</span></div></div</div>');
          
          $('.comment .comment--question').append('<ul class='+question.id+'>');
          
          $('.thread__question').append('<div class='+question.id+'></div>');
          $('.'+question.id).append('<div class="thread__answers"><form id="postComment" class="formComment form form--inline" name="postComment" method="post" action="/discussion/postComment"><input id="placeComment" class="placeComment form form--inline__input" type="text" name="comment" placeholder="Your comment"><input id="questionID" type="hidden" value='+discussionID+'" name="discussionID"><input id="discussionIDComment" type="hidden" value='+discussionID+' name=discussionID"><button id="commentSubmit" class="form--inline__btn" type="submit" name="commentSubmit">Comment</button></div>');
          
          
        });
        -->
        */
  
});