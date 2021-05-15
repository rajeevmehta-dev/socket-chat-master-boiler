const express=require('express');
var app=express();
var http = require('http').createServer(app);
const io=require('socket.io')(http);
var users=[];


app.get('/',function(req,res){

    res.sendFile(__dirname +'/app1.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    socket.emit('welcome',"You are now connected");
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        // if(!socket.username)return;
        users.splice(users.indexOf(socket.username),1);
        updateUserNames();
       console.log('A user disconnected');
    });
    // send message
    socket.on('send message',(data)=>{
        console.log(data);
        io.sockets.emit('new message',{msg:data,username:socket.username});
    });
    // on entering username
    socket.on('new user',function(data,callback){
        callback(true);
        socket.username=data;
        users.push(socket.username);
        updateUserNames();
    });
    // to update online users list
    function updateUserNames(){
        console.log(users);
        io.sockets.emit('get users',users);
    }

 });
// listen must be used with http, in order for sockets.io to work
http.listen(3000,function(err,res){
    console.log('Node Running');
});


