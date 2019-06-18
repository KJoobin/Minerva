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
  connection.query(`SELECT p.id,p.subject, p.content, p.picture,re.up FROM post AS p LEFT JOIN recomend AS re ON p.id = re.id WHERE p.created_at > now() - ${req.body.time} ORDER BY re.up DESC limit 5 `,function(err,rows) {
    if(err) throw err;
    var data = [];
    var length = rows.length;
    var limit = length - 5;
    if(limit < 0) {
      limit = 0;
    }
    res.send(rows);
  })
})

module.exports = router
