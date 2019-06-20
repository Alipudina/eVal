import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rightAnswerTextChange } from '../../redux';

class Scrambled extends Component {
  render() {
    return (
      <>

        <br></br>
        <label className=" mx-auto questionType ">Text to scramble:</label>
        <textarea rows="4" cols="4" className="mx-auto  w-25 questionType" value={this.props.rightAnswer} onChange={this.props.rightAnswerTextChange}></textarea>
        <br></br>

      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    rightAnswer: state.rightAnswer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rightAnswerTextChange: ev => dispatch(rightAnswerTextChange(ev)),
  }
}
export const ScrambledContainer = connect(mapStateToProps, mapDispatchToProps)(Scrambled);
