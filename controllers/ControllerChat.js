const controllerChat = {};

controllerChat.All = (req,res)=>{
    if(req.session.user){
        res.render('home',{name:req.session.user});
    }
    else{
        res.render('home',{name:''});
    }

}
controllerChat.Friend =(req,res)=>{
    if(req.session.user){
        res.render('chatFriend',{name:req.session.user});
    }
    else{
        res.redirect('/login');
    }
}
controllerChat.Group =(req,res)=>{
    if(req.session.user){
        res.render('chatGroup',{name:req.session.user});
    }
    else{
        res.redirect('/login');
    }
}

module.exports = controllerChat;