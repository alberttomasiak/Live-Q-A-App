var clipboard = new Clipboard('#btnShareDiscussion');

clipboard.on('success', function(e) {
	/*console.info('Action:', e.action);
	console.info('Text:', e.text);
	console.info('Trigger:', e.trigger);*/
	$('#feedbackShareDiscussion').text('Link copied to clipboard!');
	
	e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});