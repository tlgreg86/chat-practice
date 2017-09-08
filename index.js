var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  io.emit('new', { for: 'everyone', message: `A new user has entered the chat!`});
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('typing message', function() {
    socket.broadcast.emit('typing');
  });
  
  socket.on('disconnect', function(){
    socket.broadcast.emit('new', { message: 'A user has left the chat!'});
  });
  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
