const data = require('../models/data');
const api = {};

api.get_msg_general = async(req,res)=>{
    let msg = await data.get_message_general();
    res.json(msg);
}

module.exports= api;