export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function saveQuestionAnswer (questionAnswer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser: questionAnswer.authedUser,
        qid: questionAnswer.qid,
        answer: questionAnswer.answer
    }
}

export const SAVE_QUESTION = 'SAVE_QUESTION'

export function saveQuestion (question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

