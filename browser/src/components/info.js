import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';


class MyVerticallyCenteredModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>eVal</h4>
          <p>
            eVAL is an easy, convenient and intuitive tool to create your own evaluation test.
            With eVAL you can create your own questions and choose the type of answer that best fits your needs: Yes/No,
            Multiple Choice or Scrambled Text. Store different set of tests to apply whenever you need.
            Send the link of a test to anyone, by e-mail,
            and receive the results once they’ve finished. eVAL, as simple as that!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class Info extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button

          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Info
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}
