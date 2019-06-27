import React, {Component} from 'react';
import { connect } from 'react-redux';
import {rightAnswerTextChange} from '../../redux';

class Scrambled extends Component{
  render(){
    return(
      <>
        <div className="scrambledcontainer">
          <label >Text to scramble:</label>
          <br></br>
          <textarea className="questionType" value={this.props.rightAnswer} onChange={this.props.rightAnswerTextChange}
          placeholder="Don't forget capital letters and punctuation"></textarea>
        </div>
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
    rightAnswerTextChange: ev=>dispatch(rightAnswerTextChange(ev)),
  }
}
export const ScrambledContainer = connect(mapStateToProps, mapDispatchToProps)(Scrambled);
