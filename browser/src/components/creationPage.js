import React, { Component } from 'react';
// import { NavLink, Route } from 'react-router-dom';


export default class CreationPage extends Component {
    render() {
        return (
            <>
                <div className="body">
                    <h1>Create a test</h1>
                    <form>
                        <label>testName</label>
                        <input placeholder="testName" />

                        <div classname="creationBtns">
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