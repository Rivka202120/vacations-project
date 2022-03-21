const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"project"  
})

con.connect(err=>{
    if(err){
      console.log(err, '😪');
    }else{
        console.log('connected to my sql server 😊');
    }
})

const sql = (q) => {
    return new Promise((resolve,reject)=>{
        con.query(q,(err,results)=>{
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {sql}
 