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
  connection.query(`SELECT p.id,p.subject, p.content, p.picture FROM post AS p LEFT JOIN recomend AS re ON p.id = re.id WHERE re.up > 100 AND p.created_at > now() - ${req.body.time} `,function(err,rows) {
    if(err) throw err;
    var data = [];
    var length = rows.length;
    var limit = length - 5;
    if(limit < 0) {
      limit = 0;
    }

    for(let i = rows.length - 1; i >= limit; i--) {
      data.push(rows[i])
    }
    res.send(data);
  })
})

module.exports = router
