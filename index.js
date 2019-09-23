const express = require('express');
const database = require('./database');
const fetch = require('node-fetch');
const app = express();


database.create();
app.use(express.json());


app.use(express.static("./"))


app.get('/rc/:id', (req, res) => {
    const startTime =  req.query.lastrc || new Date().setHours(0,0,0,0);
    const q = `select * from reality_checks where user_id = ${req.params.id} AND time > ${startTime}`;
    database.connection.query(q, (err, results)=>{
        res.send({err,results});
    });
});

app.post('/rc', (req, res)=>{
    const q = `insert into reality_checks (time, longitude, latitude, accuracy, user_id) values(${req.body.timestamp},${req.body.coords.longitude}, ${req.body.coords.latitude}, ${req.body.coords.accuracy}, '${req.body.user_id}')`;
    const date = (new Date(req.body.timestamp)).toString();

    database.connection.query(q, (err, results)=>{
        res.send({rows: results.affectedRows, time: date, coords: [req.body.coords.latitude, req.body.coords.longitude]})
    })

})

app.listen(3306, ()=>{console.log("listening")})

