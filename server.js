var express = require('express'); 
var path= require('path'); 
var app= express(); 

app.use(express.static(path.join(__dirname + "/static"))); 
app.set("views", path.join(__dirname + '/views')); 
app.set("view engine", "ejs"); 

app.get('/', function(request, respond){
	respond.render('index'); 

});

var server= app.listen(8000, function(){
	console.log("Running on port 8000"); 
})
var io= require('socket.io').listen(server); 
var array= [];
io.sockets.on('connection', function (socket) {
	var current_user;
	socket.on('new_user', function(name){
		current_user= name; 
		socket.broadcast.emit('alert_new_user', name);
	})
	socket.on ('message', function(text){
		var message= current_user +": "+ text;
		io.emit("message", message);
		array.push(text);

	})
})
