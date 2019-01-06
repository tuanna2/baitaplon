const express = require('express');
const app = express();
const http = require('http').Server(app);
const session = require('express-session');
const io = require('socket.io')(http);
const routes = require('./routes');
const SocketManager = require('./socket/socketManager');

app.use(session({
    secret: 'abcxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 }
})); 
app.use(express.static("views/dist"));
app.set("view engine","ejs"); 
app.set("views","./views"); 
app.use(routes);

new SocketManager(io);
http.listen(process.env.PORT || 3000);