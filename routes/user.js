const controllerUser = require("../controllers/ControllerUser");
const controllerChatAll = require('../controllers/ChatAll');
const routes = require('express')();
const bodyParser =require('body-parser');

routes.use(bodyParser.urlencoded({ extended: true }));

routes.get('/',controllerChatAll.home);

routes.get('/login',controllerUser.login_get);
routes.post('/login',controllerUser.login_post)

routes.get('/register',controllerUser.register_get);
routes.post('/register',controllerUser.register_post);

module.exports = routes;