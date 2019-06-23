import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Route, Redirect} from 'react-router-dom';
import {questionTypeChange, testNameChange, questionTextChange, addFullQuestion, deleteFullQuestion, saveFullQuestionnaire, deleteQuestionnaire, showTest, loginFetch, getFullTest, fullTestChange} from '../redux';
import {YesNoAnswerContainer} from './materialui/yesno';
import {MultipleChoiceContainer} from './materialui/multiplechoice';
import {ScrambledContainer} from './materialui/scrambled';
import Auth from '../auth';
import {LogoutContainer} from './logout';


class ShowTest extends Component {
  componentDidMount(){
    this.props.getFullTest();
  }
  handleShowTest= ev => {
    ev.preventDefault();
    console.log(ev.target.value)
  }
  renderSwitch = ev=> {
    switch(ev) {
      case 'YesNo':
        return 'Yes/No';
      case 'MultipleChoice':
        return 'Multiple';
      case 'Scrambled':
       return 'Scrambled'
      default:
        return '';
    }
  }
  render() {
    var testIndex=this.props.fullTestValue;
    var test = this.props.questionnaire;
    return (
      <>
      <div className="my-auto">
        <h2 className="mb-4">Select Test</h2>
        <form
          className="contactForm d-flex flex-column align-items-center"
          action=""
          method="POST"
        >
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
        {this.props.fullTestValue!=""&&

        <div className="body fullQuestion">
          <h1>{test[testIndex].testName}</h1>
          <div>{
            test[testIndex].questionnaire.map((each, index)=>{
              return(
                <div key={index} className="fullQuestion questionType">
                  <span><b>{index+1})</b></span>
                  <span><b> Question: </b>{each.questionText}</span>
                    {this.renderSwitch(each.questionType)}
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
        fullTestValue:state.fullTestValue
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
