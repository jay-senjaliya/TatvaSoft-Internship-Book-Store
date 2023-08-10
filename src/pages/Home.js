import React, { Component } from 'react'
import Title from '../component/Title'
import './../App.css'

export default class Home extends Component {
    constructor() {
        super();
        this.state = { title: 'Title from Home', description: 'this is a description using state' }
        // this.setState(
        // title = 'Title using state',
        // discription = 'this is a description using state'
        // )
        console.log(this.state.title);
    }

    render() {
        return (
            <div>
                <div className='cards row'>
                    <Title title={this.state.title} description={this.state.description} />
                </div>

                {/* <Title title={this.state.title} description={this.state.description} />
                <Title title={this.state.title} description={this.state.description} /> */}
            </div>
        )
    }
}
