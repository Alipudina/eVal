const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testName: {type: String, required: true},
  questionInOrder: {type: Boolean},
  questionnaire:[{
    questionNumber:{type:Number, required:true},
    questionText:{type:String, required:true},
    questionType:{type:String, required:true},
    questionCorrectAnswer:{type:String, required:true},
    questionWrongAnswers:[{
      eachWrongAnswer:{type:String}
    }],
    answerValue:{type:Number, required:true, default:1}
  }]
}, {versionKey: false})

const testsModel = mongoose.model('tests', testSchema);

module.exports = testsModel;
