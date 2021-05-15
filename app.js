// CLIENT SAMPLE FOR CHECKING CONNECTION ON AND OFF
const io=require('socket.io-client');

let socket=io.connect('http://localhost:3000');


socket.on('welcome',(data)=>{


    console.log('Here is data '+data);
});