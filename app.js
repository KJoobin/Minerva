var express = require('express')
var app = express()
var http = require('http').createServer(app);
var router = require('./routers/index')
var passport = require('passport') // facebook, twitter 등을 사용하여 인
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session') // 세션 데이터를 서버측에 저장
var flash = require('connect-flash');
var AWS = require('aws-sdk');
var socket = require('socket.io')
var io = socket(http);
var mysql = require('mysql')

const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'minerva'
});

connection.connect();




AWS.config.region = process.env.REGION


/*
npm install express ejs mysql --save
npm install passport passport-local express-session connect-flash --save-dev
*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")

io.on('connection',function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message : ' + msg);
    connection.query(`INSERT feed SET feed="${msg}"`,function(err,rows){
      if(err) throw err;
      connection.query(`DELETE FROM feed ORDER BY id LIMIT 1`,function(err,rows){
        if(err) throw err;
      })
    })
    io.emit('chat message',msg);
  })
  socket.on('disconnect',function() {
    console.log('user disconnected');
  })
})
http.listen(3000,function() {
  console.log("start ! port 3000! ")
})

// **********************************

app.use(express.static(__dirname + "/static"))
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}))


app.use(passport.initialize());//passport 초기화
app.use(passport.session()); // 로그인상태 유지
app.use(flash()); // 에러를 잡아서 메세지를 쉽게 전달해

app.use(router);
