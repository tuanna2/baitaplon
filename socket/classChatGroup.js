const data = require('../models/data');

class ChatGroup{
    constructor(io,socket,name,group,color){
        this.io=io;
        this.name=name;
        this.group=group;
        this.color=color;
        this.socket=socket;
        this.listenInGroup();
    }
    async listenInGroup(){
        let msg = await data.get_message_group(this.group);
        this.socket.emit('old-msg',msg);
        this.socket.on('send-message-group',message=>{
            data.send_message_group(this.group,this.name,message);
            this.io.to(this.group).emit('send-message-group',{name:this.name,color:this.color,message:message});
        })
    }
}
module.exports = ChatGroup;