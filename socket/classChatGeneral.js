const data = require('../models/data');

class ChatGeneral{
    constructor(io,socket,name,color){
        this.io=io;
        this.name=name;
        this.color=color;
        this.socket=socket;
        this.listenInChatGeneral();
    }
    listenInChatGeneral(){
        this.socket.on('send-message',message=>{
            this.io.emit('send-message',{name:this.name,color:this.color,message:message});
            data.send_message_general(this.name,message);
        });
    }
}
module.exports=ChatGeneral;