import React, { Component } from 'react';
import {LogoutContainer} from './logout';
import {connect} from 'react-redux';
import {getTestNames} from '../redux';

class EmailSend extends Component {
  componentDidMount(){
    this.props.getTestNames();
  }

  state={
    emailToSend: "",
    testToSend: ""
  }

  inputEmailHandler= ev => {
    this.setState({emailToSend: ev.target.value, testToSend: this.refs.selectedTest.value});
  }


  render() {
    return(
      <>
        <LogoutContainer />

        <section className="resume-section p-4 p-lg-5 text-center" id="contact">
            <div className="my-auto">
              <h2 className="mb-4">Select Test</h2>
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
      </>
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
