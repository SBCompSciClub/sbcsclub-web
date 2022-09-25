import React, { Component } from 'react'
import "./Workshop.css"

export default class Workshop extends Component {
    render() {
        return (
            
            <div className="workshop-outer-box">
                <div className="workshop-inner-box">
                    <div className="workshop-front">
                        <div className="workshop-name">
                            <u>{this.props.name}</u>
                        </div>
                        <div className="workshop-leads">
                            <div>{this.props.leads[0]}</div>
                            <div>{this.props.leads[1]}</div>
                        </div>
                    </div>
                    <div className="workshop-back">
                        <div className="workshop-description">
                            {this.props.description}
                        </div>
                        {/* <div class="workshop-difficulty">
                            <div class="workshop-difficulty-text">Difficulty: </div>
                            <div style={{opacity: this.props.difficulty >= 1 ? 1: 0}} class="difficulty"></div>
                            <div style={{opacity: this.props.difficulty >= 2 ? 1: 0}}  class="difficulty"></div>
                            <div style={{opacity: this.props.difficulty >= 3 ? 1: 0}}  class="difficulty"></div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
