const ChatAll = require('./classChatAll');
const ChatFriend = require('./classChatFriend');
const ChatGroup = require('./classChatGroup');

const randomColor = require('randomcolor');

class SocketManager{
    constructor(io){
        this.active_users =[];
        io.on('connection',socket =>{
            const color = randomColor();
            socket.on('user-connect-all',name=>{
                new ChatAll(io,socket,name,color);
            });
            socket.on('connect-group',obj=>{
                socket.join(obj.group);
                new ChatGroup(io,socket,obj.name,obj.group,color);
            });
            socket.on('connect-chat-friend',name=>{
                this.active_users.push({id:socket.id,name:name});
                new ChatFriend(io,socket,name,this.active_users,color);
            });
        });
    }
}
module.exports = SocketManager;