const express = require('express');
const database = require('./database');
const fetch = require('node-fetch');
const app = express();


database.create();
app.use(express.json());


app.use(express.static("./"))


app.get('/rc/:id', (req, res) => {
    const startOfDay =  new Date().setHours(0,0,0,0);
    const q = `select * from reality_checks where user_id = ${req.params.id} AND time > ${startOfDay}`;
    database.connection.query(q, (err, results)=>{
        console.log(results.map(x=>{return{id:x.id, time: (new Date(x.time)).toString()}}));
        res.send({err,results});
    })
});

app.post('/rc', (req, res)=>{
    console.log(30);
    const q = `insert into reality_checks (time, longitude, latitude, accuracy, user_id) values(${req.body.timestamp},${req.body.coords.longitude}, ${req.body.coords.latitude}, ${req.body.coords.accuracy}, '${req.body.user_id}')`;
    const date = (new Date(req.body.timestamp)).toString();

    database.connection.query(q, (err, results)=>{
        console.log(err, results);
        res.send({rows: results.affectedRows, time: date, coords: [req.body.coords.latitude, req.body.coords.longitude]})
    })

})

app.listen(3306, ()=>{console.log("listening")})

