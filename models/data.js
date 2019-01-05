const sql = require('./connect');
const data = {};

data.send_message_general = (Username,message) =>{
    let query = "INSERT INTO `app_chat`.`message_gerenal` (`Username`, `message`) VALUES ('"+Username+"', '"+message+"');"
    sql.query(query,err=>{
        if(err) console.log(err);
    });
}
data.get_message_general = ()=>{
    return new Promise((resolve,reject)=>{
        let query = "SELECT * FROM `message_gerenal`;"
        sql.query(query,(err,result) =>{
            if(err) reject();
            else
                resolve(result);
        });
    });
}
data.send_message_group = (group,Username,message) =>{
    let query = "insert into `app_chat`.`message_group` (`group`,`Username`,`message`) values('"+group+"','"+Username+"','"+message+"');"
    sql.query(query,err=>{
        if(err) console.log(err);
    });
}
data.get_message_group = (group) =>{
    return new Promise((resolve,reject)=>{
        let query = "select `Username`,`message` from `message_group` where `group` ='" +group+"';"
        sql.query(query,(err,result) =>{
            if(err) reject();
            else
                resolve(result);
        });
    });
}
data.get_name_group =()=>{
    return new Promise((resolve,reject)=>{
        let query = "select DISTINCT `group` from `message_group`;"
        sql.query(query,(err,result) =>{
            if(err) reject();
            else
                resolve(result);
        });
    });
}
data.send_message_friend =(From,To,message)=>{
    let query = "insert into `app_chat`.`message_friend` (`From`,`To`,`message`) values('"+From+"','"+To+"','"+message+"');"
    sql.query(query,err=>{
        if(err) console.log(err);
    });
}
data.get_message_friend=(Username,Friend) =>{
    return new Promise((resolve,reject)=>{
        let query = "select `From`,`message` from `message_friend` where (`From` ='"+Username+"' and `To` ='"+Friend+"') or (`From` ='"+Friend+"' and `To` ='"+ Username +"');";
        sql.query(query,(err,result) =>{
            if(err) reject();
            else
                resolve(result);
        });
    });
}
data.get_list_inbox = (Username) =>{
    return new Promise((resolve,reject)=>{
        let query = "select DISTINCT `From`,`To` from `message_friend` where `From` ='" +Username+"' or `To` = '"+ Username +"';";
        sql.query(query,(err,result) =>{
            if(err) reject();
            else
                resolve(result);
        });
    });
}

module.exports = data;
