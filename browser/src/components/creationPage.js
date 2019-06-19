import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Route, Redirect} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, makeFetch, loginFetch} from '../redux';
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
  componentDidMount(){
    this.props.makeFetch();
  }
  sendTest = ev=>{
    ev.preventDefault();
    this.props.saveFullQuestionnaire(this.props.testName);
  }
  render() {
    return (
      <>
        <LogoutContainer />
        <NavLink to="testsPage" className="btn btn-primary login-out tests">My Tests</NavLink>
        <div className="body">
          <h1>Hello {this.props.signinUserName} {this.props.userNameInput}</h1>
          <h1>Create a test</h1>
          <form className="creatorForm" onSubmit={this.sendTest}>
          <label className="questionText">Name of the Test: </label>
          <input className="questionText" placeholder="How do you want to call it"
          value={this.props.testName}
          onChange={this.props.testNameChange} />
          <br></br>
          <label className="questionText">Question: </label>
          <input className="questionText" placeholder="Here goes your question"
          value={this.props.questionText}
          onChange={this.props.questionTextChange} />
          <br></br>
          <select className="selectQuestionType" defaultValue="" name="questionType" id="questionType" onChange={this.props.questionTypeChange}>
              <option value="" disabled>Select your option</option>
              <option value='YesNo'>Yes/No</option>
              <option value='MultipleChoice'>Multiple choice</option>
              <option value='Scrambled'>Scrambled</option>
          </select>
          {this.props.questionType==='YesNo'&&<YesNoAnswerContainer />}
          {this.props.questionType==='MultipleChoice'&&<MultipleChoiceContainer/>}
          {this.props.questionType==='Scrambled'&&<ScrambledContainer />}
          <br></br>
          <button type="button" onClick={this.props.addFullQuestion} className="questionType">Add Question</button>
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


              <div className="creationBtns questionType">
                  <button type="button" onClick={this.props.showTest}>
                        <NavLink  className="removeLink" to="/showtest">Show Test</NavLink>
                  </button>
                  <button type="submit">Save</button>
                  <button type="button" onClick={this.props.deleteQuestionnaire}>Delete Everything!</button>
              </div>
          </form>
        </div>
      </>
    )
  }
}


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
        userNameInput: state.userNameInput
    }
}
const mapDispatchToProps = dispatch => {
    return {
        questionTypeChange: ev => dispatch(questionTypeChange(ev)),
        testNameChange: ev => dispatch(testNameChange(ev)),
        questionTextChange: ev=> dispatch(questionTextChange(ev)),
        addFullQuestion: ev=> dispatch(addFullQuestion(ev)),
        deleteFullQuestion: ev=> dispatch(deleteFullQuestion(ev)),
        saveFullQuestionnaire: testName=> dispatch(saveFullQuestionnaire(testName)),
        deleteQuestionnaire: ev=> dispatch(deleteQuestionnaire(ev)),
        showTest: ev => dispatch(showTest(ev)),
        makeFetch: ev=>dispatch(makeFetch(ev)),
          makeRequest: credentials => dispatch(loginFetch(credentials))
    }
}

export const CreationPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreationPage)
export const ShowTestContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTest)
