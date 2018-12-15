const express = require('express');
const app = express();
const http = require('http').Server(app);
const session = require('express-session');
const io = require('socket.io')(http);
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const SocketManager = require('./socket/socketManager');
const controllerUser = require("./controllers/ControllerUser");
const controllerChat = require('./controllers/ControllerChat');

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

http.listen(process.env.PORT || 3000);

app.get('/',controllerChat.All);
app.get('/friend',controllerChat.Friend);
app.get('/group',controllerChat.Group);

app.get('/login',controllerUser.login_get);
app.post('/login',controllerUser.login_post)

app.get('/register',controllerUser.register_get);
app.post('/register',controllerUser.register_post);

app.get('/logout',controllerUser.logout);
