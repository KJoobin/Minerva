var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path')
var passport = require('passport')
var upload = require('./upload')
var update = require('./update')
var LocalStrategy = require('passport-local').Strategy


const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'minerva'
});


connection.connect();



router.get('/',function(req,res) {
  if(req.user) {
      var picture = (req.user.picture === null ? "https://s3.ap-northeast-2.amazonaws.com/nearbyfriends/profile_img/3092827.png" : req.user.picture)
      res.render(path.join(__dirname, "/../../views/mypage.ejs"),{id:req.user.id, nickname:req.user.nickname, picture:picture})
  } else {
    res.redirect("/")
  }
})

router.get('/recent',function(req,res) {
  console.log("/recent");
  console.log("id = ",req.user.id)
  var sql = `SELECT subject, content,id FROM post WHERE UID = ?`
  connection.query(sql,req.user.id,function(err,rows) {
    if(err) throw err;
    console.log("data = ",rows)
    res.send(rows)
  })
})

router.use('/upload',upload)
router.use('/update',update)

module.exports= router;
