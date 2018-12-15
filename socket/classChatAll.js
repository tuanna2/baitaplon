class ChatAll{
    constructor(io,socket,name,color){
        this.io=io;
        this.name=name;
        this.color=color;
        this.socket=socket;
        this.listenInChatAll();
    }
    listenInChatAll(){
        this.socket.on('send-message',message=>{
            this.io.emit('send-message',{name:this.name,color:this.color,message:message});
        });
    }
}
module.exports=ChatAll;