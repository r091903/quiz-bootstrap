var MCQ_Quiz=require("../models/quiz_all");

module.exports.create=function (req,res) {
    var quiz_all=new MCQ_Quiz();
    var mcqQuestions=req.body.mcqQuestions;
    var desQuestions=req.body.desQuestions;
    // var all_quiz_array=[];
    // // res.send(mcqQuestions+"---"+desQuestions);
    for (var i = 0; i < mcqQuestions; i++) {
      var mcq_quiz=new MCQ_Quiz();
      mcq_quiz.id=1234;
      mcq_quiz.quiz_name=req.body.quiz_name;
      mcq_quiz.session_name=req.body.session_name;
      mcq_quiz.question=req.body.question[i];
      if(mcqQuestions==1){
        mcq_quiz.option1=req.body.option1;
        mcq_quiz.option2=req.body.option2;
        mcq_quiz.option3=req.body.option3;
        mcq_quiz.option4=req.body.option4;
        mcq_quiz.correct_option=req.body.correct_option;
      }
      else if(mcqQuestions>1){
        mcq_quiz.option1=req.body.option1[i];
        mcq_quiz.option2=req.body.option2[i];
        mcq_quiz.option3=req.body.option3[i];
        mcq_quiz.option4=req.body.option4[i];
        mcq_quiz.correct_option=req.body.correct_option[i];
      }
      mcq_quiz.MCQ=true;
      mcq_quiz.Descriptive=false;
      mcq_quiz.save(function (err) {
        if(err)
          res.send(err);
      });
    }
    for (var j = 0; j < desQuestions; j++) {
      var desc_quiz=new MCQ_Quiz();
      desc_quiz.id=1234;
      desc_quiz.quiz_name=req.body.quiz_name;
      desc_quiz.session_name=req.body.session_name;
      desc_quiz.question=req.body.question[i+j];
      desc_quiz.option1="";
      desc_quiz.option2="";
      desc_quiz.option3="";
      desc_quiz.option4="";
      desc_quiz.correct_option="";
      desc_quiz.MCQ=false;
      desc_quiz.Descriptive=true;
      desc_quiz.save(function (err) {
        if(err)
          res.send(err);

      });
    }

}

module.exports.list=function (req,res) {
  MCQ_Quiz.find({},function(err,result){
    res.json(result);
  });
}
