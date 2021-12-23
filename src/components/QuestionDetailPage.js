import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {handleQuestionAnswer} from "../actions/shared";
import '../index.css';
import Error from "./Error";


class QuestionDetailPage extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }


    handleQuestionAnswerClick = (authedUser, qid, answer) => {
        this.props.dispatch(handleQuestionAnswer(authedUser, qid, answer));
    }

    render() {
        const { authedUser, user, users, question, answered } = this.props
        if (!question) {
            return <Error/>
        }
        const numVotesOpOne = question.optionOne.votes.length;
        const numVotesOpTwo = question.optionTwo.votes.length;
        const optionOnePercent = 100 / (numVotesOpOne + numVotesOpTwo) * numVotesOpOne;
        const optionTwoPercent = 100 / (numVotesOpOne + numVotesOpTwo) * numVotesOpTwo;

        if (answered){
            return (
                <div>
                    <div className="container">
                        <div className="header-img" ><img
                            className="pollImage"
                            src={users[question.author].avatarURL}
                            alt={`Avatar of ${user.name}`}
                        /></div>
                        <div className="header"><h2>Would you rather</h2></div>
                        <div className="answer1"><span
                            id="textSpan"
                            style={ question.optionOne.votes.includes(user.id)  ? { fontWeight: 'bold', textDecorationLine: 'underline'} : { fontWeight: 'normal' } }
                        >{ question.optionOne.text }</span></div>
                        <div className="answer2"><span
                            id="textSpan"
                            style={ question.optionTwo.votes.includes(user.id)  ? { fontWeight: 'bold', textDecorationLine: 'underline'} : { fontWeight: 'normal' } }
                        >{ question.optionTwo.text }</span></div>
                        <div className="num1">{numVotesOpOne} votes</div>
                        <div className="num2">{numVotesOpTwo} votes</div>
                        <div className="per1">{optionOnePercent} percent</div>
                        <div className="per2">{optionTwoPercent} percent</div>
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
                        src={users[question.author].avatarURL}
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
        question,
        answered,
        user
    }
}

export default connect(mapStateToProps)(QuestionDetailPage)