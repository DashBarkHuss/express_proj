const express = require('express');
const database = require('./database');
const fetch = require('node-fetch');
const app = express();

database.create();

app.get('/', (req, res)=>{
    database.connection.query('select * from user', (err, results)=>{
        console.log(err, res);
        res.send(results.map(x=>x.username))
    })

})

// app.post('/', (req, res)=>{
//     const q = `insert into realitychecks (time, location, user_id) values('${req.body.time}','')`;

//     database.connection.query(q, (err, results)=>{
//         console.log(err, res);
//         res.send(results.map(x=>x.username))
//     })

// })

app.listen(3306, ()=>{console.log("listening")})

fetch('http://127.0.0.1:3306/').then(x=>{console.log('done')})

