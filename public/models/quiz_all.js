var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var mcq_quizSchema=new Schema({
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

module.exports=mongoose.model('quiz_all',mcq_quizSchema,"quiz_all");
