class ChatGroup{
    constructor(io,socket,name,group,color){
        this.io=io;
        this.name=name;
        this.group=group;
        this.color=color;
        this.socket=socket;
        this.listenInGroup();
    }
    listenInGroup(){
        this.socket.on('send-message-group',message=>{
            this.io.to(this.group).emit('send-message-group',{name:this.name,color:this.color,message:message});
        })
    }
}
module.exports = ChatGroup;