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


app.post('/rc', (req, res)=>{
    console.log(req.body);
    const q = `insert into reality_checks (time, location, user_id) values('${req.body.rcInfo.timestamp}','${req.body.rcInfo.geolocation}', '${req.body.user_id}')`;

    database.connection.query(q, (err, results)=>{
        console.log(err, results);
        res.send(results)
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