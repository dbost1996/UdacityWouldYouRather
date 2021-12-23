import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";


class Questions extends Component {

    convertTimestamp (){
        const time = new Date(this.props.question.timestamp);
        return time.toLocaleDateString();
    }

    render() {
        const { question, user } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }
        return (
            <div >
                <span>
                <img
                    style={{width: 50, height: 50, borderRadius: 400/ 2}}
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                />
                    {user.name}
                </span>
                <div>
                    <div>

                        <Link to={`/question/: ${question.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            Would you rather {question.optionOne.text} or { question.optionTwo.text}</Link>
                    </div>
                    {this.convertTimestamp()}
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const user = question ? users[question.author] : null

    return {
        authedUser,
        question,
        user
    }
}

export default connect(mapStateToProps)(Questions)