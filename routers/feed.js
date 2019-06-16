var express = require('express')
var app = express()
var router = express.Router()
var path = require("path")
var mysql = require('mysql')

const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'minerva'
});

connection.connect();

router.get('/',function(req,res) {
  connection.query(`SELECT feed FROM feed ORDER BY id DESC LIMIT 20`,function(err,rows) {
    if(err) throw err;
    console.log('feed data',rows)
    var data = JSON.stringify(rows);
    res.send(data);
  })
})




module.exports = router
