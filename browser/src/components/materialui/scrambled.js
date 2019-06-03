import React, {Component} from 'react';
import { connect } from 'react-redux';
import {wrongQuestionTextChange, addWrongAnswer, deleteWrongAnswer, rightQuestionTextChange} from '../../redux';

class Scrambled extends Component{
  render(){
    return(
      <>
        <br></br>
        <label className="questionType">Text to scramble:</label>
        <textarea rows="4" cols="4" className="questionType" value={this.props.rightAnswer} onChange={this.props.rightQuestionTextChange}></textarea>
        <br></br>
      </>
    )
  }
}


const mapStateToProps = state =>{
  return{
    rightAnswer:state.rightAnswer
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    rightQuestionTextChange: ev=>dispatch(rightQuestionTextChange(ev)),
  }
}
export const ScrambledContainer = connect(mapStateToProps, mapDispatchToProps)(Scrambled);
