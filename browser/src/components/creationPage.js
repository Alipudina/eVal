import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../auth';


// protected class #########################
export default class Protected  extends Component {
  render () {
    if (Auth.isAuthenticated()) {
      return <Route component={CreationPage} />
    } else {
      return <Redirect to="/login" />
    }
  }
}

// creationPage class #########################
class CreationPage extends Component {
    render() {
        return (
            <>
                <div className="body">
                    <h1>Create a test</h1>
                    <form>
                        <label>testName</label>
                        <input placeholder="testName" />

                        <div className="creationBtns">
                            <button>Test</button>
                            <button>Save</button>
                            <button>Delete</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
