const mysql =require('mysql');

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "anhtuan",
    database: "app_chat"
});
sql.connect(err =>{
    if(err) console.log(err);
});
 
module.exports = sql;