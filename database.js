const mysql = require('mysql');

class database {
    static create(){
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.DBPW,
            database: process.env.DB
        })
    }
}

module.exports = database;
