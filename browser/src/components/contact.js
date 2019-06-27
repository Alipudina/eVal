import React, { Component } from 'react';
import ContactEmailChanged from '../defaultEmail';
import {connect} from 'react-redux';
import {emailHandler} from '../redux';
import {NavLink, Route, Redirect} from 'react-router-dom';


class Contact extends Component {
  goBack =() =>{
    window.history.back();
  }
  render() {
    return(
      <>
      <button onClick={this.goBack} className="btn btn-primary goBack">Go Back</button>
      <section className="resume-section p-4 p-lg-5 text-center" id="contact">
              <div className="my-auto">
                <h2 className="mb-4">Contact us</h2>

                <p>
                  Do you have any questions? Please do not hesitate to contact us directly.<br />
                  Our team will come back to you within a matter of hours to help you.
                </p>

                <form onSubmit={this.props.emailHandler}
                  ref="contactForm"
                  className="contactForm d-flex flex-column align-items-center"
                  action="https://formspree.io/alipudina55@gmail.com"
                  method="POST"
                >
                  <div className="form-group w-75">
                    <input
                      type="name"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-group w-75">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>

                  <div className="form-group w-75">
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder="Message"
                      rows="7"
                      name="name"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-submit btn-info w-75">Submit</button>
                </form>
              </div>
            </section>
            {ContactEmailChanged.isTouched() && this.props.isManipulated && <div className="alert alert-danger my-4">Please Do not touch the Code!</div>}
      </>
    )
  }
}

const mapStateToProps= state => {
  return {
    isManipulated: state.isManipulated
  }
}

const mapDispatchToProps= dispatch => {
  return {
    emailHandler: ev => dispatch(emailHandler(ev))
  }
}

export const ContactContainer=connect(mapStateToProps, mapDispatchToProps)(Contact);
