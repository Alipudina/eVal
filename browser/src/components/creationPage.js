import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Route, Redirect} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, loginFetch} from '../redux';
import {YesNoAnswerContainer} from './materialui/yesno';
import {MultipleChoiceContainer} from './materialui/multiplechoice';
import {ScrambledContainer} from './materialui/scrambled';
import Auth from '../auth';
import {LogoutContainer} from './logout';


// protected class #########################
export class Protected  extends Component {
  render () {
    if (Auth.isAuthenticated()) {
      return <Route component={CreationPageContainer} />
    } else {
      return <Redirect to="/login" />
    }
  }
}


class CreationPage extends Component {

  sendTest = ev=>{
    ev.preventDefault();
    this.props.saveFullQuestionnaire({
      testName:this.props.testName,
      questionnaire:this.props.allFullQuestions.map((each, index)=>({
                questionNumber:index+1,
                questionType:each.questionType,
                questionText:each.questionText,
                questionCorrectAnswer:each.rightAnswer,
                questionWrongAnswers:each.allWrongAnswers.map((eachWrongAnswer, index)=>({
                      eachWrongAnswer:eachWrongAnswer
                }))
            }))
      })
    }

  render() {
    return (
      <div className="CreationPage-Container">
        <LogoutContainer />
        <NavLink to="/emailsend" className="btn btn-primary sendTests">Send Tests</NavLink>
        <NavLink to="/showtest" className="btn btn-primary showTests">Show Test</NavLink>
        <div className="body">
          <h2>Hello <b>{this.props.signinUserName} {this.props.userNameInput}</b></h2>
          <h3>Create a test</h3>
          <form className="creatorForm creator-form" onSubmit={this.sendTest}>
            <div className="form-group">
              <label htmlFor="testname" className="questionText">Name of the Test: </label>
              <input id="testname" className="questionText form-control" placeholder="How do you want to call it"
              value={this.props.testName}
              onChange={this.props.testNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="question" className="questionText">Question: </label>
            <input id="question" className="questionText form-control" placeholder="Here goes your question"
            value={this.props.questionText}
            onChange={this.props.questionTextChange} />
          </div>
          <br></br>
          <div className="form-group">
            <select className="selectQuestionType form-control" defaultValue="" name="questionType" id="questionType" onChange={this.props.questionTypeChange}>
                <option value="" disabled>Select your option</option>
                <option value='YesNo'>Yes/No</option>
                <option value='MultipleChoice'>Multiple choice</option>
                <option value='Scrambled'>Scrambled</option>
            </select>
          </div>
          <div className="questionTypeContainer">
            {this.props.questionType==='YesNo'&&<YesNoAnswerContainer />}
            {this.props.questionType==='MultipleChoice'&&<MultipleChoiceContainer/>}
            {this.props.questionType==='Scrambled'&&<ScrambledContainer />}
          </div>

          <button type="button" onClick={this.props.addFullQuestion} className="questionType btn btn-primary addQuestion">Add Question</button>
          {
            this.props.allFullQuestions&&this.props.allFullQuestions.map((each, index)=>{
              return(
                <div key={index} className="fullQuestion questionType">
                  <span><b>{index+1}) </b></span>
                  <span><b>Type:  </b>{each.questionType}</span>
                  <span><b>Question:  </b>{each.questionText}</span>
                  <span><b>Right answer:  </b>{each.rightAnswer}</span>
                  {each.allWrongAnswers.length>0&&<span><b>Wrong answer(s):</b></span>}
                  {each.allWrongAnswers&&each.allWrongAnswers.map((wrongAnswer, index)=>{
                    return(
                        <span key={index}><b>{index+1}) </b> {wrongAnswer}</span>
                    )

                  })}
                  <span>
                    <button type="button" className="btn btn-warning btn-sm deleteQuestionBtn" onClick={this.props.deleteFullQuestion} value={index}>Delete</button>
                  </span>
                </div>
              )
            })
          }
              <div className="creationBtns questionType">
                  <button className="btn btn-info" type="submit">Save Full Test</button>
                  <button className="btn btn-danger" type="button" onClick={this.props.deleteQuestionnaire}>Delete Everything!</button>
              </div>
          </form>
        </div>
      </div>
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
        // showTest: ev => dispatch(showTest(ev)),
        // makeFetch: ev=>dispatch(makeFetch(ev)),
        makeRequest: credentials => dispatch(loginFetch(credentials)),
    }
}

export const CreationPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreationPage)
// export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
