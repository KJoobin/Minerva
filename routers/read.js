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

router.get('/post',function(req,res) {
  data = {};
  connection.query('SELECT * FROM post',function(err,rows) {
    if(err) throw err;
    res.send(rows);
  })
})

router.get('/',function(req,res) {
  data = {};
  if(req.user) {
    data.id = req.user.id;
    req.user.picture === null ? data.picture = "" : data.picture = req.user.picture
    data.myNick = req.user.nick;
  } else {
    data.id = "";
    data.picture = "";
    data.myNick = "";
  }
  console.log(req.query.id)
  if(req.query.id === undefined ) {
      res.render(path.join(__dirname,"../views/read.ejs"),data);
  } else {
    connection.query('SELECT * FROM post WHERE id = ?',req.query.id,function(err,rows) {
      if(err) throw err;
      data.subject = rows[0].subject;
      data.category = rows[0].category;
      !rows[0].tag ? data.tag = rows[0].category : data.tag = rows[0].tag;
      data.content = rows[0].content;
      data.source = rows[0].source;
      data.response = rows[0].response;
      rows[0].emotion = JSON.parse(rows[0].emotion);
      data.emotion1 = rows[0].emotion[0];
      data.emotion2 = rows[0].emotion[1];
      data.emotion3 = rows[0].emotion[2];
      data.create = rows[0].created_at
      res.render(path.join(__dirname,"../views/desc.ejs"),data);
    })
  }
})


module.exports = router
