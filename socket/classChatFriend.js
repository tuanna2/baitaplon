const data = require('../models/data');

class ChatFriend{
    constructor(io,socket,name,active_users,color){
        this.io=io;
        this.name=name;
        this.active_users=active_users;
        this.color=color;
        this.socket=socket;
        this.listenInChat();
    }
    listenInChat(){
        this.socket.on('get-msg',async friend=>{
            let msg = await data.get_message_friend(this.name,friend);
            this.socket.emit('get-msg',msg);
        });
        this.socket.on('send-message-friend',obj=>{
            data.send_message_friend(this.name,obj.friend,obj.message);
            let arr=this.active_users.filter(people=>{
                return people.name == obj.friend;
            });
            arr.forEach(element => {
               this.socket.broadcast.to(element.id).emit('send-message-friend',{name:this.name,color:this.color,message:obj.message});
            });
            this.socket.emit('send-message-friend',{name:this.name,color:this.color,message:obj.message})
        });
        this.socket.on('disconnect',()=>{
            this.active_users.splice(this.active_users.findIndex(element=>element.id == this.socket.id),1);
        });
    }
}
module.exports = ChatFriend;