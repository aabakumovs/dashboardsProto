$(document).ready(function() {
	var mockData = {
		data: 'mockData'
	}
	function sendDataToServer() {
		$.ajax({
			method: 'POST',
			url: '/',
			data: mockData
		});
	}
	$('#btnMsg').on('click', function(){
		mockData.type = 'message';
		sendDataToServer();
		console.log('send log message');
	});
	$('#btnErr').on('click', function(){
		mockData.type = 'error';
		sendDataToServer();
		console.log('send error message');
	});
	$('#btnStream').on('click', function(){
		mockData.type = 'streamStart';
		sendDataToServer();
		console.log('start stream');
	});
});