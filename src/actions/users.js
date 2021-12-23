export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function saveUserAnswer (userAnswer) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser: userAnswer.authedUser,
        qid: userAnswer.qid,
        answer: userAnswer.answer
    }
}

export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'

export function saveUserQuestion (question) {
    return {
        type: SAVE_USER_QUESTION,
        question
    }
}