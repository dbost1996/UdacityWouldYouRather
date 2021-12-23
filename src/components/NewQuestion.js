import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css'
import { handleSaveQuestion } from "../actions/shared";
import {Link} from "react-router-dom";

class NewQuestion extends Component {

    state = {
        input1: '',
        input2: ''
    };

    handleSaveQuestion = () => {
        this.props.dispatch(handleSaveQuestion(this.state.input1, this.state.input2, this.props.authedUser));
    }

    updateInputValue1 = (event) => {
        this.setState({
            input1: event.target.value
        });
    }

    updateInputValue2 = (event) => {
        this.setState({
            input2: event.target.value
        });
    }
    render() {
        return (
            <div className="container">
                <h2 id="headerNewQuestion">Would you rather</h2>
                <div id="option1Text">
                    Option 1:
                </div>
                <input value={this.state.input1} onChange={this.updateInputValue1} id="option1Input"/>
                <div id="option2Text">
                    Option 2:
                </div>
                <input value={this.state.input2} onChange={this.updateInputValue2} id="option2Input" />
                <Link  id="saveQuestionLink" className="link" to="/">
                    <button disabled={this.state.input1 === '' || this.state.input2 === ''} onClick={() => this.handleSaveQuestion()}  id="saveQuestionButton">
                    Save Question
                    </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps ({ }) {
    return {
    }
}

export default connect(mapStateToProps)(NewQuestion)