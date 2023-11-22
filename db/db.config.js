
// NOTE halkaan waxaa ku qeexan (database config) isticmaal database si aad 
// u isticmashid mysql, sameey database _name oo u bixi (fast_food_db)
const mysql= require('mysql2');

const connection= mysql.createConnection({
    host: "localhost",
    user: "root",  // if you are using custom username use your own custom username here
    password: "", // if your are using custom password use your own custom password here
    database: "fast_food_db"   // make sure to create this database
})

connection.connect((err)=>{
    if(err) throw err;

})

module.exports.getConnection=connection;