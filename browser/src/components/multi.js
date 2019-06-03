import React, { Component } from 'react';


export default class Multi extends Component {

    render() {
        return (
            <>
                <div className="multiDiv">
                    <input type="text" placeholder="Question"></input>
                    <input type="radio" ></input><input placeholder="a1"></input>
                    <input type="radio" ></input><input placeholder="a2"></input>
                    <input type="radio" ></input><input placeholder="a3"></input>
                    <input type="radio" ></input><input placeholder="a4"></input>
                </div>
            </>
        )
    }
}