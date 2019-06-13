var express = require('express')
var app = express()
var router = express.Router()
var path = require("path")
var mysql = require('mysql')

const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'Minerva'
});

connection.connect();

router.get('/post',function(req,res) {
  console.log("/post")
  connection.query('SELECT * FROM post',function(err,rows) {
    if(err) throw err;
    res.send(rows);
  })
})

router.get('/',function(req,res) {
  res.render(path.join(__dirname,"../views/read.ejs") )
})

module.exports = router
