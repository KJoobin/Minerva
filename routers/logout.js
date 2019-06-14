var express = require('express')
var app = express()
var router = express.Router()

router.get('/', function(req,res) {
  console.log(req)
  req.logout();
  res.redirect('/');
})

module.exports = router;
