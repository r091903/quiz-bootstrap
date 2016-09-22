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

var quizSchema=new Schema({
  id:Number,
  quiz_name:String,
  session_name:String,
  question:String,
  option1:String,
  option2:String,
  option3:String,
  option4:String,
  correct_option:String,
  MCQ:Boolean,
  Descriptive:Boolean
});
var Quiz=mongoose.model('quiz',quizSchema);
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

router.post("/uploadQuiz",urlencodedParser,function(req,res) {
  // var mcqQuestions=req.body.mcqQuestions;
  // var desQuestions=req.body.desQuestions;
  // res.send(mcqQuestions+"---"+desQuestions);
  // for (var i = 0; i < mcqQuestions; i++) {
  //
  // }
  var quiz=new Quiz();
  quiz.id=1234;
  quiz.quiz_name=req.body.quiz_name;
  quiz.session_name=req.body.session_name;
  quiz.question=req.body.question;
  quiz.option1=req.body.option1;
  quiz.option2=req.body.option2;
  quiz.option3=req.body.option3;
  quiz.option4=req.body.option4;
  quiz.correct_option=req.body.correct_option;
  quiz.MCQ=req.body.question_type;
  quiz.Descriptive=req.body.question_type;
  quiz.save(function (err) {
    if(err)
      res.send(err);
    else{
      Quiz.find(function (err , data) {
        res.send(data);
      });
    }
  });
  //res.send("uploaded successful");
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
  //this finds all users
  mongoose.model('users').find(function (err,users) {
    res.send(users);
  });
});
router.get("/quizPaper",function (req,res) {
  Quiz.find(function (err,data) {
    res.render('/sample',{paper:data});
  });
});

router.get("/admin",function(req,res){
  res.sendFile(path + "viewQuiz_Admin.html");
});

router.get("/participant",function(req,res){
  res.sendFile(path + "quizParticipant.html");
});


router.get("/sample",function(req,res){
  res.sendFile(path + "quiz_sample.html");
});

router.get("/creat_sample",function(req,res){
  res.sendFile(path + "create_quiz_sample.html");
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
