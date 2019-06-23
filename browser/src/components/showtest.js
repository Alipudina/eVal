import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Route, Redirect} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, loginFetch} from '../redux';
import {YesNoAnswerContainer} from './materialui/yesno';
import {MultipleChoiceContainer} from './materialui/multiplechoice';
import {ScrambledContainer} from './materialui/scrambled';
import Auth from '../auth';
import {LogoutContainer} from './logout';


class ShowTest extends Component {
  render() {
    return (
      <>
        <div className="body fullQuestion">
          <h1>{this.props.testName}</h1>
          <div>
          {
            this.props.allFullQuestions&&this.props.allFullQuestions.map((each, index)=>{
              return(
                <div key={index} className="fullQuestion questionType">
                  <span><b>{index+1})</b></span>
                  <span><b>Type:</b>{each.questionType}</span>
                  <span><b>Question:</b>{each.questionText}</span>
                  <span><b>Right answer:</b>{each.rightAnswer}</span>
                  {each.allWrongAnswers.length>0&&<span><b>Wrong answer(s):</b></span>}
                  {each.allWrongAnswers&&each.allWrongAnswers.map((wrongAnswer, index)=>{
                    return(
                        <span key={index}><b>{index+1})</b> {wrongAnswer}</span>
                    )

                  })}
                  <span>
                    <button type="button" className="deleteButton" onClick={this.props.deleteFullQuestion} value={index}>Delete</button>
                  </span>
                </div>
              )
            })
          }
          </div>
        </div>
        <button type="button"><NavLink  className="removeLink" to="/create">Go Back</NavLink></button>
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
        allTestNames:state.allTestNames
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
    }
}

export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
