import React, {Component} from 'react';
import { connect } from 'react-redux';
import {wrongAnswerTextChange, addWrongAnswer, deleteWrongAnswer, rightAnswerTextChange} from '../../redux';

class MultipleChoice extends Component{
  render(){
    return(
      <div className="multiplechoice-container">
        <div className="form-group">
          <label for="rightAnswer">Right Answer:</label>
          <input id="rightAnswer" className="form-control" value={this.props.rightAnswer} onChange={this.props.rightAnswerTextChange} />
        </div>

        <div className="form-group">
          <label for="wrongAnswer" className="questionType">Wrong Answer(s):</label>
          <input className="questionType form-control" id="wrongAnswer" onChange={this.props.wrongAnswerTextChange} value={this.props.wrongAnswer}/>
        </div>
        <button type="button" className="questionType btn btn-secondary" onClick={this.props.addWrongAnswer}>Add Wrong Answer</button>

        <div>
          {
            this.props.allWrongAnswers&&this.props.allWrongAnswers.map((each, index)=>{
              return(
                <div key={index} className="allWrongAnswers questionType multiWrongQuestionContainer">
                  <div className="multiWrongQuestion">{each}</div>
                  <span className="deleteWrongQ">
                    <button type="button" onClick={this.props.deleteWrongAnswer}
                    className="deleteButton btn btn-danger" value={index}>Delete</button>
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
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
