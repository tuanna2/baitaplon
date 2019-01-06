const controllerUser = require("./controllers/ControllerUser");
const controllerChat = require('./controllers/ControllerChat');
const controllerAdmin = require('./controllers/ControllerAdmin');

const route =  require('express')();
const bodyParser =require('body-parser');
route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

route.get('/',controllerChat.General);
route.get('/friend',isUser,controllerChat.Friend);
route.get('/group',isUser,controllerChat.Group);

route.get('/login',controllerUser.login_get);
route.post('/login',controllerUser.login_post);

route.get('/register',controllerUser.register_get);
route.post('/register',controllerUser.register_post);

route.get('/logout',controllerUser.logout);

route.get('/admin/1',isAdmin,controllerAdmin.log_general);
route.get('/admin/2',isAdmin,controllerAdmin.all_group);
route.get('/admin/2/:group',isAdmin,controllerAdmin.log_group);
route.get('/admin/3',isAdmin,controllerAdmin.log_friend);
route.get('/admin/3/:user',isAdmin,controllerAdmin.log_friend_listib)

route.get('/admin/login',controllerAdmin.login_get);
route.post('/admin/login',controllerAdmin.login_post);
route.get('/admin',isAdmin,controllerAdmin.qlUser);
route.get('/delete/:user',isAdmin,controllerUser.del);

route.get('*',controllerChat.General);

function isUser(req,res,next){
    if(req.session.user)
        return next();
    else
        res.redirect('/login');
}
function isAdmin(req,res,next){
    if(req.session.user== 'admin')
        return next();
    else
        res.redirect('/admin/login');
}

module.exports = route;