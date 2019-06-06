import React, { Component } from 'react';

export default class Conatct extends Component {

  render() {
    return(
      <>

      <section className="resume-section p-4 p-lg-5 text-center" id="contact">
              <div className="my-auto">
                <h2 className="mb-4">Contact us</h2>

                <p>
                  Do you have any questions? Please do not hesitate to contact us directly.<br />
                  Our team will come back to you within a matter of hours to help you.
                </p>

                <form
                  className="contact-form d-flex flex-column align-items-center"
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
      </>
    )
  }
}
