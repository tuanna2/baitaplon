const ChatAll = require('./classChatAll');
const randomColor = require('randomcolor');

class SocketManager{
    constructor(io){
        io.on('connection',socket =>{
            socket.on('user-connect-all',name=>{
                const color = randomColor();
                new ChatAll(io,socket,name,color);
            });
        });
    }
}
module.exports = SocketManager;