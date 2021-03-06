import React, { Component } from 'react';
import {LogoutContainer} from './logout';
import {connect} from 'react-redux';
import {getTestNames} from '../redux';
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
    this.setState({emailToSend: ev.target.value, testToSend: this.refs.selectedTest.value});
  }


  render() {
    return(
      <div className="log_signContainer">
        <LogoutContainer />
        <NavLink to="/create" className="btn btn-primary backToCreate" onClick={this.backToCreate}>Back</NavLink>

        <section className="resume-section p-4 p-lg-5 text-center testFormBackground" id="contact">
            <div className="my-auto">
              <h3 className="mb-4">Select Test</h3>
              <form
                className="contactForm d-flex flex-column align-items-center"
                action=""
                method="POST"
              >
                <div className="form-group w-75">
                  <select name="carlist" form="carform" className="form-control" ref="selectedTest">
                  {this.props.allTestNames.map((elem, index) => {
                    return <option value={elem.testName} key={index}>{elem.testName}</option>
                  })}
                  </select>

                </div>

                <div className="form-group w-75">
                  <input onChange={this.inputEmailHandler}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>


                <a type="submit" href={"mailto:"+ this.state.emailToSend+ "?subject=" + this.state.testToSend + "&body=" + this.props.testLink} className="btn btn-submit btn-success w-25">SEND</a>
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
    questionnaire:state.questionnaire
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTestNames: (ev) => dispatch(getTestNames(ev))
  }
}

export const EmailSendContainer=connect(mapStateToProps, mapDispatchToProps)(EmailSend);
