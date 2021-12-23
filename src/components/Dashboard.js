import React, { Component } from 'react'
import { connect } from 'react-redux'
import Questions from "./Questions";
import {Tabs} from "react-bootstrap";
import {Tab} from "bootstrap";
import LoadingBar from "react-redux-loading";

class Dashboard extends Component {

    compareTimestamps( a, b ) {
        if ( a.timestamp < b.timestamp ){
            return 1;
        }
        if ( a.timestamp > b.timestamp ){
            return -1;
        }
        return 0;
    }

    render() {

        const { answeredQuestions, unansweredQuestion, user } = this.props
        answeredQuestions.sort(this.compareTimestamps)
        unansweredQuestion.sort(this.compareTimestamps)
        return (
            <div>
                <LoadingBar />
                <h2>Hello {user.name}</h2>
            <Tabs defaultActiveKey="unanswered" className="mb-3">
                <Tab eventKey="unanswered" title="Unanswered polls">
                    <ul className='dashboard-list'>
                        {unansweredQuestion.map((element) => (
                            <li key={element.id}>
                                <Questions id={element.id}/>
                            </li>
                        ))}
                    </ul>
                </Tab>
                <Tab eventKey="answered" title="Answered polls">
                    <ul className='dashboard-list'>
                        {answeredQuestions.map((element) => (
                            <li key={element.id}>
                                <Questions id={element.id}/>
                            </li>
                        ))}
                    </ul>
                </Tab>

            </Tabs>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {
    const user = users[authedUser];
    const answeredIds = user ? Object.keys(user['answers']) : [];
    const answeredQuestions = [];
    const unansweredQuestion = [];

    answeredIds.forEach(element =>
        answeredQuestions.push(questions[element]))

    for (const key in questions){
        if(!answeredQuestions.includes(questions[key])){
            unansweredQuestion.push(questions[key]);
        }
    }

    return {
        questionsIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answeredQuestions,
        unansweredQuestion,
        user
    }
}

export default connect(mapStateToProps)(Dashboard)