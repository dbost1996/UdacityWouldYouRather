import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    sortUsers( a, b ) {
        if ( a.score < b.score ){
            return 1;
        }
        if ( a.score > b.score ){
            return -1;
        }
        return 0;
    }

    render() {
        const { question, users, completeScore } = this.props
        completeScore.sort(this.sortUsers);
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        return (
            <div >
                <ul className='dashboard-list'>
                    {completeScore.map((element) => (
                        <li key={element.id}>
                            <div>
                                <img
                                    style={{width: 50, height: 50, borderRadius: 400/ 2}}
                                    src={users[element.id].avatarURL}
                                    alt={`Avatar of ${users[element.id].name}`}
                                />
                                {users[element.id].name}
                            </div>
                            <div>
                                {Object.keys(users[element.id].answers).length} questions answered
                            </div>
                            <div>
                                {users[element.id].questions.length} questions asked
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {

    const user = users[authedUser];
    let userIds = Object.keys(users);
    let numberOfAnswers = []
    userIds.forEach(element =>
        numberOfAnswers.push(Object.keys(users[element].answers).length))
    let numberOfQuestions = []
    userIds.forEach(element =>
        numberOfQuestions.push(users[element].questions.length))
    let score = numberOfQuestions.map(function (num, idx) {
        return num + numberOfAnswers[idx];
    });

    let completeScore = userIds.map(function (x, i) {
        return { id: x, score: score[i] }
    });



    const question = questions[id]

    return {
        authedUser,
        question,
        user,
        users,
        completeScore
    }
}

export default connect(mapStateToProps)(Leaderboard)