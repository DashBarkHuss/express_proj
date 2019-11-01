const express = require('express');
const database = require('./database');
const fetch = require('node-fetch');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


database.create();
app.use(express.json());


app.use(express.static("./"))
app.use(express.static(__dirname))



app.get('/rc/:id/today', (req, res) => {

    const startTime =  req.query.lastrc || new Date().setHours(0,0,0,0);
    const q = `select * from reality_checks where user_id = ${req.params.id} AND time > ${startTime}`;
    database.connection.query(q, (err, results)=>{
        // console.log({err,results, userId: req.params.id});
        res.send({err,results, userId: req.params.id});
    });
});

app.post('/rc', (req, res)=>{

    const q = `insert into reality_checks (time, longitude, latitude, accuracy, user_id) values(${req.body.timestamp},${req.body.coords.longitude}, ${req.body.coords.latitude}, ${req.body.coords.accuracy}, '${req.body.userId}')`;
    const date = (new Date(req.body.timestamp)).toString();

    database.connection.query(q, (err, results)=>{ 
        if (err){
            console.log("oops");
            res.send({message:"oops"});
            return;
        }
        if (results.affectedRows) io.emit("databaseUpdated", {message: "database updated", userId: req.body.userId});
        res.send({rows: results.affectedRows, time: date, coords: [req.body.coords.latitude, req.body.coords.longitude]})
    })

})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})


