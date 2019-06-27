import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, loginFetch, getFullTest, fullTestChange, selectAnswer, compareAnswers} from '../redux';
import {LogoutContainer} from './logout';


function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class ShowTest extends Component {
  componentDidMount(){
    document.cookie='testId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log(document.cookie);
    this.props.getFullTest();
  }

handleSubmit = ev=>{
  ev.preventDefault();
  this.props.compareAnswers();
}

  render() {
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;

    return (
      <>
      <div className="CreationPage-Container">
        <LogoutContainer />
        <NavLink to="/emailsend" className="btn btn-primary sendTests">Send Tests</NavLink>
        <NavLink to="/create" className="btn btn-primary showTests">Create Test</NavLink>
        <div className="body">
          <h3>Select Test</h3>
            <form className="contactForm d-flex flex-column align-items-center">
              <div className="form-group w-75">
                <select name="carlist" form="carform" defaultValue="" placeholder="Select a test" className="selectQuestionType form-control" ref="selectedTest" onChange={this.props.fullTestChange}>
                <option value="" key="empty" disabled>Select your option</option>
                {test.map((elem, index) => {
                  return <option value={index} key={index}>{elem.testName}</option>
                })}
                </select>
              </div>
            </form>

            <form onSubmit={this.handleSubmit}>
            {this.props.fullTestValue!==""&&

            <div className="body fullQuestion form-group w-75 showTest">
              <h1>{test[testIndex].testName}</h1>
              <div>{
                test[testIndex].questionnaire.map((each, index)=>{
                  return(
                    <div key={index} value={index} className="fullQuestion questionType">
                      <span><b>{index+1})</b></span>
                      <span><b> Question: </b>{each.questionText}</span>
                      {each.questionType==='YesNo'&&<YesNoAnswerContainer/>}
                      {each.questionType==='MultipleChoice'&&<MultipleChoiceAnswerContainer questionIndex={each.questionNumber-1}/>}
                      {each.questionType==='Scrambled'&&<ScrambledAnswerContainer />}
                    </div>
                  )
                })
              }
              </div>
            </div>
            }
            <div className="creationBtns questionType w-75">
                <button className="btn btn-info" type="submit">Evaluate</button>
            </div>
            <h3>Correct Answers: {this.props.answerPoints} of {this.props.correctAnswerArray.length}</h3>
            </form>
        </div>
      </div>
      </>
    )
  }
}


class YesNoAnswer extends Component {
  handleChange = ev=>{
    var tempQuestionNumber= parseInt(ev.target.parentElement.parentElement.getAttribute("value"));
    var tempAnswerValue = ev.target.value;
      this.props.userAnswersArray[tempQuestionNumber]=tempAnswerValue;

      console.log(this.props.userAnswersArray)
  }
  render(){
    return(
      <>
      <div>
        <select className="reset" questionnumber={this.props.questionNumber} defaultValue="" placeholder="Select an answer" onChange={this.handleChange}>
          <option value="" disabled>Select your option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      </>
    )
  }
}

class MultipleChoiceAnswer extends Component {
  handleChange = ev=>{
    var tempQuestionNumber= parseInt(ev.target.parentElement.parentElement.getAttribute("value"));
    var tempAnswerValue = ev.target.value;
    this.props.userAnswersArray[tempQuestionNumber]=tempAnswerValue;

    console.log(this.props.userAnswersArray)
  }
  render(){
    var mixAns=[];
    var i=this.props.questionIndex;
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;
    var wrongAns = test[testIndex].questionnaire.map((eachWrong, index)=>{
      return eachWrong.questionWrongAnswers
    });
    var correctAns = test[testIndex].questionnaire.map((eachRight, index)=>{
      return eachRight.questionCorrectAnswer
    });

      mixAns[i]=wrongAns[i].map((elem)=>{
          return (elem.eachWrongAnswer)
        })
        mixAns[i].push(correctAns[i])
        shuffleArray(mixAns[i])
    return(
      <>
      <div>
        <select className="reset" defaultValue="" placeholder="Select a test" onChange={this.handleChange}>
          <option value="" key="empty" disabled>Select your option</option>
          {mixAns[i].map((elem, index)=>{
                return <option key={index} >{elem}</option>
              })}
        </select>
      </div>
      </>
    )
  }
};

class ScrambledAnswer extends Component {
  handleChange = ev=>{
    var tempQuestionNumber= parseInt(ev.target.parentElement.parentElement.getAttribute("value"));
    var tempAnswerValue = ev.target.value;
    this.props.userAnswersArray[tempQuestionNumber]=tempAnswerValue;

    console.log(this.props.userAnswersArray)
  }
  render(){
        var correctAns=[];
        var testIndex=this.props.fullTestValue;
        var test = this.props.questionnaire;

        test[testIndex].questionnaire.map((each, index)=>{
          if (each.questionType==="Scrambled"){
            correctAns.push(each.questionCorrectAnswer)
          }
        })
          correctAns=correctAns+'';
          correctAns=correctAns.toUpperCase().split('');
          shuffleArray(correctAns);

    return(
      <>
      <div>
        <div>
          <b>{correctAns}</b>
        </div>
        <textarea onChange={this.handleChange} placeholder="Remember capital letters"></textarea>
      </div>
      </>
    )
  }
}



const mapStateToProps = state => {
    return {
        testName: state.testName,
        questionText: state.questionText,
        questionType: state.questionType,
        allFullQuestions: state.allFullQuestions,
        showTest:state.showTest,
        signinUserName: state.signinUserName,
        userNameInput: state.userNameInput,
        allTestNames:state.allTestNames,
        questionnaire:state.questionnaire,
        fullTestValue:state.fullTestValue,
        questionCorrectAnswer:state.questionnaire.questionCorrectAnswer,
        eachWrongAnswer:state.questionnaire.eachWrongAnswer,
        userAnswersArray:state.userAnswersArray,
        correctAnswerArray: state.correctAnswerArray,
        answerPoints:state.answerPoints
    }
}
const mapDispatchToProps = dispatch => {
    return {
        questionTypeChange: ev => dispatch(questionTypeChange(ev)),
        testNameChange: ev => dispatch(testNameChange(ev)),
        questionTextChange: ev=> dispatch(questionTextChange(ev)),
        addFullQuestion: ev=> dispatch(addFullQuestion(ev)),
        deleteFullQuestion: ev=> dispatch(deleteFullQuestion(ev)),
        saveFullQuestionnaire: fullTest=> dispatch(saveFullQuestionnaire(fullTest)),
        deleteQuestionnaire: ev=> dispatch(deleteQuestionnaire(ev)),
        showTest: ev => dispatch(showTest(ev)),
        makeRequest: credentials => dispatch(loginFetch(credentials)),
        getFullTest: (ev) => dispatch(getFullTest(ev)),
        fullTestChange: ev => dispatch(fullTestChange(ev)),
        selectAnswer: ev => dispatch(selectAnswer(ev)),
        compareAnswers: ev =>dispatch(compareAnswers(ev))
    }
}

export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer)
export const MultipleChoiceAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceAnswer)
export const ScrambledAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(ScrambledAnswer)
