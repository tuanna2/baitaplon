const express = require('express');
const app = express();
const http = require('http').Server(app);
const session = require('express-session');
const iosk = require('socket.io')(http);
const SocketManager = require('./socket/socketManager');
const routes = require('./routes/user');

app.use(session({
    secret: 'mabimat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 }
})); 

const io = iosk.of('/all');
new SocketManager(io);

http.listen(3000);

app.use(express.static("views/dist"));
app.set("view engine","ejs"); 
app.set("views","./views"); 

app.use(routes);