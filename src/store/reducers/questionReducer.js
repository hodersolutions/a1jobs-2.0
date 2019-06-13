import { CREATE_QUESTION_SUCCESS, CREATE_QUESTION_ERROR, GET_QUESTION_SUCCESS, GET_QUESTION_ERROR, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR, UPDATE_QUESTION_SUCCESS, DELETE_QUESTION_SUCCESS, QUESTION_SHOW_LOADING } from '../types/questionTypes';

const initState = {
    response: null,
    status: '',
    questions: [],
    current_question: null,
    error: null,
    loading: false    
}

const questionReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: CREATE_QUESTION_SUCCESS,
                response: action.response
            }
        case CREATE_QUESTION_ERROR:    
            return {
                ...state,
                loading: false,
                status: CREATE_QUESTION_ERROR,
                error: action.error
            }
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_QUESTIONS_SUCCESS,
                questions: action.response.questions,
                response: action.response
            }
        case GET_QUESTIONS_ERROR:
            return {
                ...state,
                loading: false,
                status: GET_QUESTIONS_ERROR,
                questions: [],
                error: action.error
            }
        case GET_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_QUESTION_SUCCESS,
                questions: [],
                current_question: action.question,
                response: action.response
            }
        case GET_QUESTION_ERROR:
            const empty = {
                'id': '<---->',
                'question' : '<---->',                
                'options': [],
                'creator_id': '<---->',
            };
            return {
                ...state,
                loading: false,
                current_question: empty,
                questions: [],
                status: GET_QUESTION_ERROR,
                error: action.error
            }
        case UPDATE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: UPDATE_QUESTION_SUCCESS,
                response: action.response
            }
        case QUESTION_SHOW_LOADING:
            return {
                ...state,
                loading: true            
            }
        case DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: DELETE_QUESTION_SUCCESS,                
                response: action.response
            }
        default:
            return state;
    }
}

export default questionReducer;