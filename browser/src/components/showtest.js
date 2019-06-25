import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, loginFetch, getFullTest, fullTestChange, selectAnswer} from '../redux';
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
    this.props.getFullTest();
  }

handleSubmit = ev=>{
  ev.preventDefault();
}

  render() {
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;
    return (
      <>
      <LogoutContainer />
      <div className="my-auto">
        <h2 className="mb-4">Select Test</h2>
        <form className="contactForm d-flex flex-column align-items-center">
          <div className="form-group w-75">
            <select name="carlist" form="carform" defaultValue="" placeholder="Select a test" className="form-control" ref="selectedTest" onChange={this.props.fullTestChange}>
            <option value="" key="empty" disabled>Select your option</option>
            {test.map((elem, index) => {
              return <option value={index} key={index}>{elem.testName}</option>
            })}
            </select>
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
        {this.props.fullTestValue!==""&&

        <div className="body fullQuestion">
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
        <button type="button"><NavLink  className="removeLink" to="/create">Go Back</NavLink></button>
        <button type="submit" >Evaluate</button>
        </form>
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
        <select questionnumber={this.props.questionNumber} defaultValue="" placeholder="Select an answer" onChange={this.handleChange}>
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
        <select defaultValue="" placeholder="Select a test" onChange={this.handleChange}>
        <option value="" key="empty" disabled>Select your option</option>
        {mixAns[i].map((elem, index)=>{
              return <option key={index} >{elem}</option>
            })}
        }
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
        userAnswersArray:state.userAnswersArray
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
        selectAnswer: ev => dispatch(selectAnswer(ev))
    }
}

export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer)
export const MultipleChoiceAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceAnswer)
export const ScrambledAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(ScrambledAnswer)
