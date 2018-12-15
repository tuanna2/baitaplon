const mysql =require('mysql');

const sql = mysql.createConnection({
    host: "db4free.net",
    user: "tuanna2",
    password: "anhtuan9x",
    database: "sql_free"
});
sql.connect(err =>{
    if(err) console.log(err);
});
 
module.exports = sql;