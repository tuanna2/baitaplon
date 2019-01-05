const sql = require('./connect');
const user = {};

user.register = (Username,Password,Email) =>{
    return new Promise((resolve,reject)=>{
        let query = "insert into `users`(`Username`,`Password`,`Email`) values ('"+ Username+ "','"+Password+"','"+Email+"');";
        sql.query(query,err=>{
            if(err) reject("Dang ky khong thanh cong");
            else
                resolve('Dang ky thanh cong');
        });
    });
}

user.login = (Username,Password) =>{
    return new Promise((resolve,reject) => {
        let query="select * from `users` where Username='"+ Username +"' and Password='"+Password+"';";
        sql.query(query,(err,result) => {
            if(result.length==0)
                return reject("Sai tai khoan hoac mat khau");
            else if(result.length==1)
                resolve();
            else
                reject("Dang nhap khong thanh cong");
        });
    });
}
user.del =(Username)=>{
    return new Promise((resolve,reject)=>{
        let query ="delete from `users` where Username='"+Username+"';"
        sql.query(query,err=>{
            if(err) reject();
            else
                resolve();
        });
    })
}
user.showAll =()=>{
    return new Promise((resolve,reject) => {
        let query="select * from `users`";
        sql.query(query,(err,result) => {
            if(err) reject();
            else
                resolve(result);
        });
    });
}

module.exports = user;