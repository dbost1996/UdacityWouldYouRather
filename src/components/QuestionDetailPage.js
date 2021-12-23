import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {handleQuestionAnswer} from "../actions/shared";
import '../index.css';


class QuestionDetailPage extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }


    handleQuestionAnswerClick = (authedUser, qid, answer) => {
        this.props.dispatch(handleQuestionAnswer(authedUser, qid, answer));
    }

    render() {
        const { authedUser, user, questions, question, answered } = this.props
        const numVotesOpOne = question.optionOne.votes.length;
        const numVotesOpTwo = question.optionTwo.votes.length;
        const optionOnePercent = 100 / (numVotesOpOne + numVotesOpTwo) * numVotesOpOne;
        const optionTwoPercent = 100 / (numVotesOpOne + numVotesOpTwo) * numVotesOpTwo;



        if (!question) {
            return <p>This Question doesn't exist {this.props.id.slice(1)}</p>
        }
        if (answered){
            return (
                <div>
                    <div className="container">
                        <headerImg><img
                            className="pollImage"
                            src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                        /></headerImg>
                        <header><h2>Would you rather</h2></header>
                        <answer1><span
                            id="textSpan"
                            style={ question.optionOne.votes.includes(user.id)  ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }
                        >{ question.optionOne.text }</span></answer1>
                        <answer2><span
                            id="textSpan"
                            style={ question.optionTwo.votes.includes(user.id)  ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }
                        >{ question.optionTwo.text }</span></answer2>
                        <num1>{numVotesOpOne} votes</num1>
                        <num2>{numVotesOpTwo} votes</num2>
                        <per1>{optionOnePercent} percent</per1>
                        <per2>{optionTwoPercent} percent</per2>
                    </div>
                </div>
            )
        }
        return (
            <div  >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>
                    <img
                        className="pollImage"
                        src={user.avatarURL}
                        alt={`Avatar of ${user.name}`}
                    />
                </div>

                <h2 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    Would you rather
                </h2>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>
                    <button onClick={() => this.handleQuestionAnswerClick(authedUser, question.id, 'optionOne')}  className="pollButton"
                    >
                        <div className="pollText">
                            {question.optionOne.text}
                        </div>
                        </button>
                    <div className="or">
                        or
                    </div>
                    <button onClick={() => this.handleQuestionAnswerClick(authedUser, question.id, 'optionTwo')} className="pollButton">
                        <div className="pollText">
                            {question.optionTwo.text}
                        </div>
                        </button>
                </div>

            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions},  { id }) {
    const question = questions[id.slice(2)]

    const user = users[authedUser];
    const answeredIds = user ? Object.keys(user['answers']) : [];
    const answeredQuestions = [];
    answeredIds.forEach(element =>
        answeredQuestions.push(questions[element]))
    let answered = false
    if(answeredQuestions.includes(question)){
        answered = true;
    }
    return {
        authedUser,
        users,
        questions,
        question,
        answered,
        user
    }
}

export default connect(mapStateToProps)(QuestionDetailPage)