import React, {Component} from 'react';
import { connect } from 'react-redux';
import {wrongAnswerTextChange, addWrongAnswer, deleteWrongAnswer, rightAnswerTextChange} from '../../redux';

class MultipleChoice extends Component{
  render(){
    return(
      <>
        <br></br>
        <label className="questionType">Right Answer:</label>
        <input value={this.props.rightAnswer} onChange={this.props.rightAnswerTextChange} className="questionType"/>
        <br></br>
        <label className="questionType">Wrong Answer(s):</label>
        <input className="questionType" onChange={this.props.wrongAnswerTextChange} value={this.props.wrongAnswer}/>
        <button type="button" className="questionType" onClick={this.props.addWrongAnswer}>Add Wrong Answer</button>
        {
          this.props.allWrongAnswers&&this.props.allWrongAnswers.map((each, index)=>{
            return(
              <div key={index} className="allWrongAnswers questionType">
                {each}
                <span>
                  <button type="button" onClick={this.props.deleteWrongAnswer}
                  className="deleteButton" value={index}>Delete</button>
                </span>
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
    wrongAnswerTextChange: ev=>dispatch(wrongAnswerTextChange(ev)),
    rightAnswerTextChange: ev=>dispatch(rightAnswerTextChange(ev)),
    deleteWrongAnswer: ev=> dispatch(deleteWrongAnswer(ev))
  }
}
export const MultipleChoiceContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);
