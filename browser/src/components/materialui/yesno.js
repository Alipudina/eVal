import React, { Component } from 'react';
import { connect } from 'react-redux';
import {rightAnswerTextChange} from '../../redux';

class YesNoAnswer extends Component{
  render(){
    return(
      <div className="yesNoContainer">
        <div className="form-check">
            <input
              className="form-check-input"
              id="yes"
              type="radio"
              name="yesno"
              value="yes"
              onChange={this.props.rightAnswerTextChange}
            />
          <label className="form-check-label" htmlFor="yes">Yes</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="no"
              type="radio"
              name="yesno"
              value="no"
              onChange={this.props.rightAnswerTextChange}
            />
          <label className="form-check-label" htmlFor="no">No</label>
        </div>
      </div>
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
export const YesNoAnswerContainer = connect(mapStateToProps, mapDispatchToProps)(YesNoAnswer);
