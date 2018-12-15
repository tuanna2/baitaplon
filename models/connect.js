const mysql =require('mysql');

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tuantuan",
    database: "app_chat"
});
sql.connect(err =>{
    if(err) console.log(err);
});
 
module.exports = sql;