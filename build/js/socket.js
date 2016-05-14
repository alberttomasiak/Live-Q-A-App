// SOCKET.IO SCRIPT CLIENT
var socket = io();

/*var socket = io.connect('http://localhost');
  
});*/
$( document ).ready(function() {
    
	$('#postComment').submit(function(){
		socket.emit('comment', $('#placeComment').val());
		$('#placeComment').val('');
		return false;
	});
	socket.on('comment', function(msg){
		var li = "<li>"+msg+"</li>";
		//$('.thread__answers ul').append(li);
		alert(msg);
	});
	
});

