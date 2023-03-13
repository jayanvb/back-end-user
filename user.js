var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user-management'
});


connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')

})

app.use(cors())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/getalldata',(req,res) => {
    connection.query('select * from user', (error, results, fields) => {
        if(error)throw error;
        console.log(results);
    res.json(results);
    })
    
});

app.post('/getalladddata',(req,res) => {
    var data = req.body;
    connection.query('INSERT INTO user SET ?' , data ,  (error, results, fields) => {
        if(error)throw error;
        console.log(results);
    res.json(results);
    })
    
})
app.put('/getallupdatedata',(req,res) => {
    console.log(req.body);
    connection.query(' UPDATE user SET  `UserName`=?,`Email`=?,`Password`=?,`Hobby`=?,`Gender`=?,`Joined`=? where `id`=?', [req.body.UserName,req.body.Email,req.body.Password,req.body.Hobby,
        req.body.Gender,req.body.Joined,req.body.id] , (error, results,field) => {
            if (error) throw error;
            console.log(results);
            res.json(results);
        })
   
})
app.get('/getalldatabyid/:id',(req,res) => {
    const { id } = req.params;

    connection.query('select * FROM user where `id` = ?',[id], (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        res.json(results);
    })
});

app.delete('/getalldeletedata',(req,res) => {
    connection.query('DELETE FROM user where `id` = ?',[req.body.id], (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        res.json(results);
    })
});


app.listen(7777,() =>{
    console.log('okk');
})







console.log('jay shree swaminarayan');