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

var mcq_quizSchema=new Schema({
  id:String,
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
var MCQ_Quiz=mongoose.model('quiz_all',mcq_quizSchema,"quiz_all");

app.use(express.static(__dirname+'/public'));
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
  var date = new Date();
  var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var id="quiz"+date.getDate()+monthShortNames[date.getMonth()]+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();

  var mcqQuestions=req.body.mcqQuestions;
  var desQuestions=req.body.desQuestions;
  var count=0;
  for (var i = 0; i < mcqQuestions; i++) {
    var mcq_quiz=new MCQ_Quiz();

    mcq_quiz.id=id;
    mcq_quiz.quiz_name=req.body.quiz_name;
    mcq_quiz.session_name=req.body.session_name;
    if(mcqQuestions==1 && desQuestions==0){
      mcq_quiz.question=req.body.question;
    }
    if(mcqQuestions==1 && desQuestions!=0){
      mcq_quiz.question=req.body.question[i];
    }
    if(mcqQuestions==1){
      mcq_quiz.option1=req.body.option1;
      mcq_quiz.option2=req.body.option2;
      mcq_quiz.option3=req.body.option3;
      mcq_quiz.option4=req.body.option4;
      mcq_quiz.correct_option=req.body.correct_option;
    }
    else if(mcqQuestions>1){
      mcq_quiz.question=req.body.question[i];
      mcq_quiz.option1=req.body.option1[i];
      mcq_quiz.option2=req.body.option2[i];
      mcq_quiz.option3=req.body.option3[i];
      mcq_quiz.option4=req.body.option4[i];
      mcq_quiz.correct_option=req.body.correct_option[i];
    }
    mcq_quiz.MCQ=true;
    mcq_quiz.Descriptive=false;
    // all_quiz_array.push(mcq_quiz);
    mcq_quiz.save(function (err) {
      if(err){
        res.send(err);
      }
      else{
        count++;
      }
    });
  }
  for (var j = 0; j < desQuestions; j++) {
    var desc_quiz=new MCQ_Quiz();
    desc_quiz.id=id;
    desc_quiz.quiz_name=req.body.quiz_name;
    desc_quiz.session_name=req.body.session_name;
    if(desQuestions==1 && mcqQuestions==0){
      desc_quiz.question=req.body.question;
    }
    else{
      desc_quiz.question=req.body.question[i+j];
    }
    desc_quiz.option1="";
    desc_quiz.option2="";
    desc_quiz.option3="";
    desc_quiz.option4="";
    desc_quiz.correct_option="";
    desc_quiz.MCQ=false;
    desc_quiz.Descriptive=true;
    // all_quiz_array.push(desc_quiz);
    desc_quiz.save(function (err) {
      if(err){
        res.send(err);
      }
      else{
        count++;
      }
    });
  }
  res.sendFile(path + "create_quiz_sample.html");
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


router.post("/getResult",urlencodedParser,function (req,res) {
  res.json(req.body);
});

router.get("/users",function(req,res){
  //this finds all users
  mongoose.model('users').find(function (err,users) {
    res.send(users);
  });
});

router.get("/getQuestions",function(req,res){
  //this finds all users
  MCQ_Quiz.find(function (err,users) {
    res.json(users);
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
