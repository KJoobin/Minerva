var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path')
var multer = require('multer')

var multerS3 = require('multer-s3')
var AWS = require("aws-sdk");
AWS.config.loadFromPath(path.join(__dirname, "/../context/awsconfig.json"));
var s3 = new AWS.S3();

var upload = multer({
  limits: { fileSize : 2 * 1024 * 1024 },
  storage: multerS3({
    s3:s3,
    bucket:"nearbyfriends/Minerva",
    key:function(req,file,cb) {
      var extension = path.extname(file.originalname);
      cb(null,Date.now().toString() + extension)
    },
    acl:'public-read-write'
  })

  });




const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'minerva'
});

connection.connect();


router.get('/',function(req,res) {
  res.render(path.join(__dirname,"../views/writing.ejs"))
})

router.post('/', upload.array('img'), function(req,res) {
  var data = req.body;
  console.log(data);
  var info = {};
  var img = req.files;
  var imgs = imgToArr(img);
  var emotion = "[0,0,0]"
  info.UID = 1;
  info.subject = data.title;
  info.category = data.category;
  info.tag = data.tag;
  info.content = data.desc;
  info.source = data.source;
  info.response = data.response;
  info.emotion = emotion;
  info.hit = 0;
  info.picture = imgs;
  // console.log(1,data.category,data.title,data.desc,imgs,0,emotion)

  console.log(`INSERT INTO post(UID, category, subject, content, picture, hit, emotion ) values = ?`,[1,data.category,data.title,data.desc,imgs,0,emotion])
  connection.query(`INSERT INTO post SET  ? `,info,function(err,rows) {
    if(err) throw err;
  })
  res.send();
})

function imgToArr(imgs) {
  var imgsLocation = [];
  if(imgs === undefined) {
    return "[]"
  }
  for(var i = 0; i < imgs.length; i++) {
    imgsLocation.push(imgs[i].location);
  }
  return JSON.stringify(imgsLocation);
}


module.exports= router;
// https://www.zerocho.com/category/NodeJS/post/5950a6c4f7934c001894ea83 multer 정리
