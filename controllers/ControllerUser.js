const user = require("../models/user");
const controllerUser = {};

controllerUser.register_get = (req,res) =>{
    res.render('register',{success:1});
}
controllerUser.register_post = (req,res) =>{
    user.register(req.body.Username,req.body.Password,req.body.Email)
    .then(()=>{
        req.session.user=req.body.Username;
        res.redirect("/");
    },
    ()=>res.render('register',{success:0})
    );
}
controllerUser.login_get = (req,res)=>{
    res.render('login',{success:1});
};
controllerUser.login_post = (req,res)=>{
    user.login(req.body.Username,req.body.Password)
    .then(()=>{
        req.session.user=req.body.Username;
        res.redirect("/");
    },
    ()=>res.render('login',{success:0})
    );
}

module.exports = controllerUser;