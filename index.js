const express = require('express');
const database = require('./database');
const fetch = require('node-fetch');
const app = express();


database.create();
app.use(express.json());


app.use(express.static("./"))

app.get('/', (req, res)=>{
    database.connection.query('select * from user', (err, results)=>{
        console.log(err, res);
        res.send(results.map(x=>x.username))
    })

})

app.get('/hi/:name', (req, res) => {
    const hi = `Hi ${req.params.name}`;
    res.send('hi');
});
app.get('/hi', (req, res) => {
    res.send('hi');
});

app.post('/rc', (req, res)=>{
    console.log(30);
    const q = `insert into reality_checks (time, longitude, latitude, accuracy, user_id) values(${req.body.timestamp},${req.body.coords.longitude}, ${req.body.coords.latitude}, ${req.body.coords.accuracy}, '${req.body.user_id}')`;
    const date = (new Date(req.body.timestamp)).toString();

    database.connection.query(q, (err, results)=>{
        console.log(err, results);
        res.send({rows: results.affectedRows, time: date})
    })

})

app.listen(3306, ()=>{console.log("listening")})

// fetch('http://127.0.0.1:3306/test',         {
//     method: "POST",
//     body: JSON.stringify({user_id: 1}),
//     body: JSON.stringify({"rcInfo":{"timestamp":1568221782150,"user_id":1}}),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(x=>{console.log('done')})