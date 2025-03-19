import mysql from 'mysql'
 const con= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeems'
 })

 con.connect(function(err){
    if (err) {
        return console.error('error connecting: ' + err.stack);
        }else{
            console.log('connected as id ' + con.threadId);
        }
 })
 export default con;