var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizApp');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Schema=mongoose.Schema;

var userSchema=new Schema({
  id:Number,
  username:String
});
var users=mongoose.model('users',userSchema);
// var Users=require('/models')('Users');
// var Users=models.users;
app.use(express.static('public'));
var router = express.Router();
var path = __dirname+"/";

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/faculty",function(req,res){
  res.sendFile(path + "create_quiz.html");

});

router.post("/creatUser",urlencodedParser,function(req,res) {
  var user=new users();
  user.id=req.body.idNum;
  user.username=req.body.username;
  user.save(function (err) {
    if(err)
      res.send(err);
    res.json({message:"user created"});
  });
});




router.get("/users",function(req,res){
  mongoose.model('users').find(function (err,users) {
    res.send(users);
  });
});
router.get("/admin",function(req,res){
  res.sendFile(path + "viewQuiz_Admin.html");
});

router.get("/participant",function(req,res){
  res.sendFile(path + "quizParticipant.html");
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
