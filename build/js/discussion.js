// SOCKET.IO SCRIPT CLIENT
$( document ).ready(function() {
	var socket = io();

	// declare variables
	var formComment = $('#postComment'); // form comments
	var btnComment = $('#commentSubmit'); // submit button comments
	var inputComment = $('#placeComment'); // input field comments

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
	
	formComment.submit(function(e){
		var comment = inputComment.val();
		socket.emit('comment', comment);
		inputComment.val('');
		return false;
		//e.preventDefault();
	});



	socket.on('comment', function(data){
		var li = "<li>"+msg+"</li>";
		$('.thread__answers ul').append($('<li>').text(data));
		console.log("Bericht: " + data);
		
	});

});