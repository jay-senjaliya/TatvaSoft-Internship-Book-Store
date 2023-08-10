import React, { Component } from 'react'

export default class Counter extends Component {
    constructor() {
        super();
        this.state = { number: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ number: this.state.number + 1 });
    }
    render() {
        return (
            <div>
                <button style={{ width: '50vw', height: '50vh', fontSize: '5rem', border: '2px solid black', borderRadius: '50px', backgroundColor: '#eb5234', color: '#86d1bc' }} onClick={this.handleClick}>Click Here: {this.state.number}</button>
            </div>
        )
    }
}
