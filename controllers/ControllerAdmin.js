const controllerAdmin = {};
const data = require('../models/data');
const user = require('../models/user');

controllerAdmin.login_get= (req,res)=>{
    if(req.session.user== 'admin')
        res.redirect('/admin');
    else
        res.render('loginAdmin',{success:1});
};
controllerAdmin.login_post = (req,res) =>{
    if(req.body.Username=='admin' && req.body.Password == 'anhtuan'){
        req.session.user= 'admin';
        res.redirect('/admin');
    }
    else
        res.render('loginAdmin',{success:0});
}
controllerAdmin.qlUser =async(req,res)=>{
    if(req.session.user=='admin'){
        let data = await user.showAll();
        res.render('qlUser',{data:data});
    }
    else
        res.render('loginAdmin',{success:1});
}

controllerAdmin.log_general =async (req,res) =>{
    if(req.session.user== 'admin'){
        let msg = await data.get_message_general();
        res.render('log1',{msg:msg});
    }
    else
        res.render('loginAdmin',{success:1});
}
controllerAdmin.all_group =async (req,res) =>{
    if(req.session.user== 'admin'){
        let group = await data.get_name_group();
        res.render('log2',{group:group});
    }
    else
        res.render('loginAdmin',{success:1});
}
controllerAdmin.log_group =async (req,res)=>{
    let msg = await data.get_message_group(req.params.group);
    res.render('logGroup',{msg:msg});
}

controllerAdmin.log_friend =async (req,res) =>{
    if(req.session.user== 'admin'){
        let data = await user.showAll();
        res.render('log3',{data:data});
    }
    else
        res.render('loginAdmin',{success:1});
}

module.exports = controllerAdmin;