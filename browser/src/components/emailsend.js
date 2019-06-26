import React, { Component } from 'react';
import {LogoutContainer} from './logout';
import {connect} from 'react-redux';
import {getTestNames, sendTests, userEmailChange} from '../redux';
import { NavLink } from 'react-router-dom';

import Auth from '../auth';

class EmailSend extends Component {
  componentDidMount(){
    this.props.getTestNames();
  }

  state={
    emailToSend: "",
    testToSend: ""
  }

  backToCreate= () => {
    Auth.login();
  }

  inputEmailHandler= ev => {
    // this.setState({emailToSend: ev.target.value, testToSend: this.refs.selectedTest.value});
    console.log(this.props.testName)
  }

  handleChange=ev=>{
    console.log(ev.target.value)
  }
  handleSubmit = ev=>{
    ev.preventDefault();
    this.props.sendTests({
      testName:this.props.testName,
      email:this.props.userEmail
    })
  }

  render() {
    return(
      <div className="log_signContainer">
        <LogoutContainer />
        <NavLink to="/create" className="btn btn-primary backToCreate" onClick={this.backToCreate}>Back
        </NavLink>

        <section className="resume-section p-4 p-lg-5 text-center testFormBackground" id="contact">
            <div className="my-auto">
              <h3 className="mb-4">Select Test</h3>
              <form
                className="contactForm d-flex flex-column align-items-center"
                onSubmit={this.handleSubmit}
                >
                <div className="form-group w-75">
                  <select name="carlist" form="carform" className="form-control" ref="selectedTest"
                  onChange={this.handleChange}>
                  {this.props.allTestNames.map((elem, index) => {
                    return <option value={elem.testName} key={index}>{elem.testName}</option>
                  })}
                  </select>

                </div>

                <div className="form-group w-75">
                  <input onChange={this.props.userEmailChange}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={this.props.userEmail}
                    required
                  />
                  <div>{this.props.userEmail}</div>
                </div>


                <button type="submit" className="btn btn-submit btn-success w-25">SEND</button>
              </form>
            </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps= state => {
  return {
    allTestNames: state.allTestNames,
    testLink: state.testLink,
    questionnaire:state.questionnaire,
    testName:state.testName,
    userEmail:state.userEmail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTestNames: (ev) => dispatch(getTestNames(ev)),
    sendTests:(ev)=>dispatch(sendTests(ev)),
    userEmailChange: (ev)=>dispatch(userEmailChange(ev))
  }
}

export const EmailSendContainer=connect(mapStateToProps, mapDispatchToProps)(EmailSend);
