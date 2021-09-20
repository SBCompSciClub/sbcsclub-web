import React, { Component } from 'react'
import "./Workshop.css"

export default class Workshop extends Component {
    render() {
        return (
            
            <div class="workshop-outer-box">
                <div class="workshop-inner-box">
                    <div class="workshop-front">
                        <div class="workshop-name">
                            <u>{this.props.name}</u>
                        </div>
                        <div class="workshop-leads">
                            <div>{this.props.leads[0]}</div>
                            <div>{this.props.leads[1]}</div>
                        </div>
                    </div>
                    <div class="workshop-back">
                        <div class="workshop-description">
                            {this.props.description}
                        </div>
                        <div class="workshop-difficulty">
                            <div class="workshop-difficulty-text">Difficulty: </div>
                            <div style={{opacity: this.props.difficulty >= 1 ? 1: 0}} class="difficulty"></div>
                            <div style={{opacity: this.props.difficulty >= 2 ? 1: 0}}  class="difficulty"></div>
                            <div style={{opacity: this.props.difficulty >= 3 ? 1: 0}}  class="difficulty"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
