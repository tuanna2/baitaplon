class ChatAll{
    constructor(io,socket,name,color){
        this.io=io;
        this.name=name;
        this.color=color;
        this.socket=socket;
        this.listenInChatAll();
    }
    listenInChatAll(){
        this.socket.join('room-chat-all');
        new refreshRoom(this.io);
        this.socket.on('send-message',message=>{
            this.io.to('room-chat-all').emit('send-message',{name:this.name,color:this.color,message:message});
        });
        this.socket.on('disconnect',()=>new refreshRoom(this.io));
    }
}
class refreshRoom{
    constructor(io){
        this.io=io;
        this.refresh();
    }
    refresh(){
        this.io.in('room-chat-all').clients((err,clients) => {
            if(err) console.log(err);
            this.io.to('room-chat-all').emit('refresh',clients.length)
        });
    }
}
module.exports=ChatAll;