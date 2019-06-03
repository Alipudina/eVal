import React, {Component} from 'react';
import { connect } from 'react-redux';
import {wrongQuestionTextChange, addWrongAnswer, deleteWrongAnswer, rightQuestionTextChange} from '../../redux';

class MultipleChoice extends Component{
  render(){
    return(
      <>
        <br></br>
        <label className="questionType">Right Answer:</label>
        <input value={this.props.rightAnswer} onChange={this.props.rightQuestionTextChange} className="questionType"/>
        <br></br>
        <label className="questionType">Wrong Answer(s):</label>
        <input className="questionType" onChange={this.props.wrongQuestionTextChange} value={this.props.wrongAnswer}/>
        <button type="button" className="questionType" onClick={this.props.addWrongAnswer}>Add Wrong Answer</button>
        {
          this.props.allWrongAnswers&&this.props.allWrongAnswers.map((each, index)=>{
            return(
              <div key={index} className="allWrongAnswers questionType">
                <br></br>
                <div>{each}</div>
                <button type="button" onClick={this.props.deleteWrongAnswer} value={index}>Delete</button>
              </div>
            )
          })
        }
      </>
    );
  }
}


const mapStateToProps = state =>{
  return{
    wrongAnswer: state.wrongAnswer,
    allWrongAnswers:state.allWrongAnswers,
    rightAnswer:state.rightAnswer
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    addWrongAnswer: ev=>dispatch(addWrongAnswer(ev)),
    wrongQuestionTextChange: ev=>dispatch(wrongQuestionTextChange(ev)),
    rightQuestionTextChange: ev=>dispatch(rightQuestionTextChange(ev)),
    deleteWrongAnswer: ev=> dispatch(deleteWrongAnswer(ev))
  }
}
export const MultipleChoiceContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);
