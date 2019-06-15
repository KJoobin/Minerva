var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path')

const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'baby',
  database  : 'nearbyfriends'
});


connection.connect();

// UPDATE table_name SET field1 = new-value1, field2 = new-value2
// [WHERE Clause]
router.post('/',function(req,res) {
  var info = req.body;
  console.log(info);
  connection.query(`UPDATE identity SET nickname = ?, area = ?, about = ? WHERE id = ?`,[info.nickName, info.area, info.about, req.user.id], function(err, row) {
    if(err) throw err;
    console.log(row);
  })
  res.send();
})



module.exports= router;
