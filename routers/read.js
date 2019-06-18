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
  console.log("read/post is word")
  var now = new Date
  now = now.getTime()
  var day = 24 * 60 * 60 * 1000;
  var sql = `SELECT p.id, i.nickname, p.subject,p.content, p.created_at FROM post AS p LEFT JOIN identity AS i ON p.UID = i.ID WHERE created_at > ${now} ORDER BY id DESC LIMIT 5`
  connection.query(sql,function(err,rows) {
      if(err) throw err;
      console.log("read_data_rows ################### ",rows);
      for(var i = 0; i < rows.length; i++) {
        console.log(rows[0].created_at > now );
      }
        res.send(rows);
    })
})

router.get('/',function(req,res) {
  data = {};
  if(req.user) {
    data.id = req.user.id;
    req.user.picture === null ? data.picture = "https://s3.ap-northeast-2.amazonaws.com/nearbyfriends/profile_img/3092827.png" : data.picture = req.user.picture
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
    connection.query('SELECT p.subject, p.category, p.tag, p.content, p.source, p.response, p.emotion, p.created_at, p.picture, re.up, re.down FROM post AS p LEFT JOIN recomend AS re ON p.id = re.id WHERE p.id = ?',req.query.id,function(err,rows) {
      if(err) throw err;
      console.log(rows[0]);

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
      console.log(data.create.getTime());
      picture = JSON.parse(rows[0].picture);
      data.img1 = picture[0]
      data.img2 = picture[1]
      data.img3 = picture[2]
      data.img4 = picture[3]
      data.up = rows[0].up;
      data.down = rows[0].down;
      res.render(path.join(__dirname,"../views/desc.ejs"),data);
    })
  }
})

router.post('/recomend',function(req,res) {
  console.log("recomend is Work",req.body,req.query.id)
  var sql = `SELECT * FROM recomend WHERE id = ?`
  connection.query(sql,req.query.id,function(err,rows) {
    if(err) throw err;
    console.log('recomend rows',rows[0]);
    var uid = rows[0].UID;
    uid = JSON.parse(uid);
    console.log(uid,"   ---   ",typeof uid)
    if(uid.indexOf(req.user.id) === -1) {
      uid.push(req.user.id);
      uid = JSON.stringify(uid);
      console.log(uid,"------",typeof uid);
      if(req.body.recomend === 'up') {
        sql = `UPDATE recomend SET up = ${rows[0].up + 1}, uid = "${uid}" WHERE id = ?`
      } else if(req.body.recomend === 'down') {
        sql = `UPDATE recomend SET down = ${rows[0].down + 1}, uid = "${uid}" WHERE id = ?`
      }
      connection.query(sql,req.query.id,function(err,row) {
        if (err) throw err;
        console.log(row);
        res.send("1")
      })
    } else {
      res.send("0")
    }
  })
})



module.exports = router
