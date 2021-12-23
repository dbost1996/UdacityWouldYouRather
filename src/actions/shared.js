import {_getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion} from '../utils/_DATA'
import { receiveUsers, saveUserAnswer } from './users'
import {receiveQuestions, saveQuestion, saveQuestionAnswer} from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, questions]) => ({
            users,
            questions,
        })).then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleSaveQuestion (optionOneText, optionTwoText, authedUser) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText
        })
            .then((question) => {
                dispatch(saveQuestion(question));
                dispatch(hideLoading());
            })
    }
}

export function handleQuestionAnswer (authedUser, qid, answer) {
    return (dispatch) => {
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }). then (() => {
            dispatch(saveQuestionAnswer({authedUser, qid, answer}))
            dispatch(saveUserAnswer({authedUser, qid, answer}))
        })
    }
}