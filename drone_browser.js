//initialize variables
var drone = require("ar-drone").createClient();
var fs = require('fs');
var express = require('express');
var app = express();
var PORT = 8000;
var HOST = 'localhost';
var SPEED = 0.25;
//create local server with express and socket 
var server = app.listen(PORT, HOST, function(){
console.log('The drone server is running on http://%s:%s', HOST, PORT);
});
var io = require('socket.io')(server);
//serve the static html page and handle http requests
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});
//handle connection of socket to client
io.on('connection', function(socket){
	socket.on('move', function(data){
	if (data.type == 'drone'){
		drone[data.action]();
	} else if (data.user == 'flight'){
		drone[data.action](SPEED);
	}
	});
	socket.on('stop', function(){
		drone.stop();
	});
	socket.on("disconnect", function () {
		return;
	});
});
// create video streamer to output video
video = client.getVideoStream();
video.on('data', function(data) {console.log(data);});

