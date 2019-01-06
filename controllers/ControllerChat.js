const controllerChat = {};

controllerChat.General = (req,res)=>{
    if(req.session.user){
        res.render('home',{name:req.session.user});
    }
    else{
        res.render('home',{name:''});
    }
}
controllerChat.Friend =(req,res)=>{
        res.render('chatFriend',{name:req.session.user});
}
controllerChat.Group =(req,res)=>{
        res.render('chatGroup',{name:req.session.user});
}

module.exports = controllerChat;