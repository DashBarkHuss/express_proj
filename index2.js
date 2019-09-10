const express = require('express');
const database = require('./database');
const app = express();

database.create();

app.get('/', (req, res)=>{
    res.send("hey")
})

app.listen(3000, ()=>{console.log("listening")})