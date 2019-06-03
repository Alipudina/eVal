import React, { Component } from 'react';
import { connect } from 'react-redux';
import {questionTypeChange, testNameChange, questionTextChange, questionAddAnswer, addFullQuestion, deleteFullQuestion} from '../redux';
import {YesNoAnswerContainer} from './materialui/yesno';
import {MultipleChoiceContainer} from './materialui/multiplechoice';
import {ScrambledContainer} from './materialui/scrambled';

class CreationPage extends Component {
  render() {
    return (
      <>
        <div className="body">
          <h1>Create a test</h1>
          <form className="creatorForm">
          <label className="testName">Name of Test: </label>
          <input className="testName" placeholder="Test Name"
          value={this.props.testName}
          onChange={this.props.testNameChange} />
          <br></br>
          <label className="questionText">Question: </label>
          <input className="questionText" placeholder="Here goes your question"
          value={this.props.questionText}
          onChange={this.props.questionTextChange} />
          <br></br>
          <select className="selectQuestionType" defaultValue="" name="questionType" onChange={this.props.questionTypeChange}>
              <option value="" disabled>Select your option</option>
              <option value='YesNo'>Yes/No</option>
              <option value='MultipleChoice'>Multiple choice</option>
              <option value='Scrambled'>Scrambled</option>
          </select>
          {this.props.questionType==='YesNo'&&<YesNoAnswerContainer />}
          {this.props.questionType==='MultipleChoice'&&<MultipleChoiceContainer/>}
          {this.props.questionType==='Scrambled'&&<ScrambledContainer />}
          <br></br>
          <button type="button" onClick={this.props.addFullQuestion} className="questionType">Add Another Question</button>
          </form>

          <div className="creationBtns questionType">
              <button>Test</button>
              <button>Save</button>
              <button>Delete</button>
          </div>
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
    }
}
const mapDispatchToProps = dispatch => {
    return {
        questionTypeChange: ev => dispatch(questionTypeChange(ev)),
        testNameChange: ev => dispatch(testNameChange(ev)),
        questionTextChange: ev=> dispatch(questionTextChange(ev)),
        addFullQuestion: ev=> dispatch(addFullQuestion(ev)),
        deleteFullQuestion: ev=> dispatch(deleteFullQuestion(ev)),
    }
}

export const CreationPageContainer = connect(mapStateToProps, mapDispatchToProps)(CreationPage)
