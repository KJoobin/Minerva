var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path')
var multer = require('multer')

var multerS3 = require('multer-s3')
var AWS = require("aws-sdk");
AWS.config.loadFromPath(path.join(__dirname, "/../../context/awsconfig.json"));
var s3 = new AWS.S3();

var upload = multer({
  limits: { fileSize : 2 * 1024 * 1024 },
  storage: multerS3({
    s3:s3,
    bucket:"nearbyfriends/profile_img",
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
  database  : 'nearbyfriends'
});


router.post('/', upload.single('img'), function(req,res) {
  connection.query(`SELECT picture FROM identity WHERE id = ?`,[req.user.id],function(err,rows) {
    if(rows[0].picture !== null) {
      var picture = path.basename(rows[0].picture)
      var params = {
          Bucket: 'nearbyfriends/profile_img',
          Key: picture
      };
      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
      });
    }
  })
  connection.query(`UPDATE identity SET picture =? WHERE id = ?`,[req.file.location,req.user.id],function(err,rows) {
      if(err) throw err;
      res.send(req.file.location);
  })
})

connection.connect();


module.exports= router;
// https://www.zerocho.com/category/NodeJS/post/5950a6c4f7934c001894ea83 multer 정리
