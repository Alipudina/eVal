import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, loginFetch, getFullTest, fullTestChange} from '../redux';
import {LogoutContainer} from './logout';
let mixAns=[];

class ShowTest extends Component {
  componentDidMount(){
    this.props.getFullTest();
    console.log(this.props.questionnaire)
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
        <form>
        {this.props.fullTestValue!==""&&

        <div className="body fullQuestion">
          <h1>{test[testIndex].testName}</h1>
          <div>{
            test[testIndex].questionnaire.map((each, index)=>{
              return(
                <div key={index} className="fullQuestion questionType">
                  <span><b>{index+1})</b></span>
                  <span><b> Question: </b>{each.questionText}</span>
                  {each.questionType==='YesNo'&&<YesNoAnswerContainer/>}
                  {each.questionType==='MultipleChoice'&&<MultipleChoiceAnswerContainer/>}
                  {each.questionType==='Scrambled'&&
                  <div className="form-group w-75">
                  {this.props.rightAnswer}
                  </div>
                }

                </div>
              )
            })
          }
          </div>
        </div>
        }
        <button type="button"><NavLink  className="removeLink" to="/create">Go Back</NavLink></button>
        </form>
        </div>
      </>
    )
  }
}


class YesNoAnswer extends Component {
  render(){
    return(
      <>
      <div className="form-group w-75">
        <select defaultValue="" placeholder="Select an answer">
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
  render(){
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;
    var wrongAns = test[testIndex].questionnaire.map((eachWrong, index)=>{
      return eachWrong.questionWrongAnswers
    });
    var correctAns = test[testIndex].questionnaire.map((eachRight, index)=>{
      return eachRight.questionCorrectAnswer
    });

    for (let i=0; i<wrongAns.length; i++){

        mixAns[i]=wrongAns[i].map((elem)=>{
          return (elem.eachWrongAnswer)
        })
        mixAns[i].push(correctAns[i])
    }

    console.log(mixAns);
    return(
      <>

      </>
    )
  }
}

class Scrambled extends Component {
  render(){
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;
    return(
      <>
      <div className="form-group w-75">
      {this.props.fullTestValue}
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
        questionCorrectAnswer:state.questionCorrectAnswer,
        eachWrongAnswer:state.questionnaire.eachWrongAnswer
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
    }
}

export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer)
export const MultipleChoiceAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceAnswer)
