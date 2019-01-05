const express = require('express');
const app = express();
const http = require('http').Server(app);
const session = require('express-session');
const io = require('socket.io')(http);
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const SocketManager = require('./socket/socketManager');
const controllerUser = require("./controllers/ControllerUser");
const controllerChat = require('./controllers/ControllerChat');
const controllerAdmin = require('./controllers/ControllerAdmin');
// const api=require('./controllers/api');

app.use(session({
    secret: 'abcxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 }
})); 
app.use(express.static("views/dist"));
app.set("view engine","ejs"); 
app.set("views","./views"); 

new SocketManager(io);
http.listen(3000);

app.get('/',controllerChat.General);
app.get('/friend',controllerChat.Friend);
app.get('/group',controllerChat.Group);

app.get('/login',controllerUser.login_get);
app.post('/login',controllerUser.login_post);

app.get('/register',controllerUser.register_get);
app.post('/register',controllerUser.register_post);

app.get('/logout',controllerUser.logout);

app.get('/admin/1',controllerAdmin.log_general);
app.get('/admin/2',controllerAdmin.all_group);
app.get('/admin/2/:group',controllerAdmin.log_group);
app.get('/admin/3',controllerAdmin.log_friend);
app.get('/admin/3/:user',controllerAdmin.log_friend_listib)

app.get('/admin/login',controllerAdmin.login_get);
app.post('/admin/login',controllerAdmin.login_post);
app.get('/admin',controllerAdmin.qlUser);
app.get('/delete/:user',controllerUser.del);

// app.get('/api',isAuthenticated,api.get_msg_general);


// function isAuthenticated(req,res,next){
//     if(req.session.user== 'admin')
//         return next();
//     res.json({code:"401",message:"Not Authenticated"});
// }