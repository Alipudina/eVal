import React, { Component } from 'react';
import {LogoutContainer} from './logout';
import {connect} from 'react-redux';

class TestsPage extends Component {

  state={
    addEmail: false,
    emailToSend: "",
    testToSend: ""
  }

  inputEmailHandler= ev => {
    this.setState({emailToSend: ev.target.value, testToSend: this.refs.selectedTest.value});
  }

  addEmailHandler= () => {
    this.setState({
      addEmail: true,
    });
    console.log(this.refs.selectedTest.value);
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
                  {this.props.testArray.map((elem, index) => {
                    return <option value={elem.toLowerCase()} key={index}>{elem}</option>
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

                {this.state.addEmail &&
                  <div className="form-group w-75">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                }

                <div className="form-group w-75">
                  <span className="btn btn-warning" onClick={this.addEmailHandler}>Add Email</span>
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
    testArray: state.testArray,
    testLink: state.testLink
  }
}

export const TestsPageContainer=connect(mapStateToProps)(TestsPage);
