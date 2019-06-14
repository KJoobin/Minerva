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

router.post('/',function(req,res) {
  console.log('authorNick = ',req.body.UID)
  connection.query('SELECT nickname FROM identity WHERE id = ? ',req.body.UID,function(err,rows) {
      if(err) throw err;
      console.log(rows);
        res.send(rows);
    })
})

module.exports = router
