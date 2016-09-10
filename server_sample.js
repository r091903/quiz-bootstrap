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
var quiz_controller=require("public/controllers/quiz_controller")

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

app.get("/uploadQuiz",quiz_controller.list);
app.post("/uploadQuiz",urlencodedParser,quiz_controller.create);


app.listen(3000,function(){
  console.log("Live at Port 3000");
});
