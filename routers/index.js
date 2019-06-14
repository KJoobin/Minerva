var express = require('express')
var app = express()
var router = express.Router()
var path = require("path")
var write = require("./write.js")
var read = require('./read.js')
var login = require('./login.js')
var logout = require('./logout.js')
var join = require('./join.js')

// var path = require('path')
// var join = require('./join/join')
// var login = require('./login/login')
// var logout = require('./logout/logout')
// var editor = require('./post/editor.js')
// var list = require('./list/list.js')
// var myPage = require('./myPage/main')
// var write = require('./write/write')
// var main = require('./main/main')


  router.get('/',function(req,res) {
    if(req.user) {
      console.log(req.user.picture)
      req.user.picture === null ? pic = "" : pic = req.user.picture
      res.render(path.join(__dirname,"../views/main.ejs"),{id:req.user.id, picture : pic})
    } else {
      res.render(path.join(__dirname,"../views/main.ejs"),{id:"", picture:""})
    }
  })

// router.use('/join',join)
// router.use('/mypage',myPage)
// router.use('/login',login)
// router.use('/logout',logout)
// router.use('/editor',editor)
// router.use('/list',list)
// router.use('/write',write)
// router.use('/main',main)

router.use("/write",write)
router.use('/read',read)
router.use('/login',login)
router.use('/logout',logout)
router.use('/join',join)


module.exports = router
