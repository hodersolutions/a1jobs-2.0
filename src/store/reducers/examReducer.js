import { CREATE_EXAM_SUCCESS,
         CREATE_EXAM_ERROR,
         GET_EXAM_SUCCESS, 
         GET_EXAM_ERROR, 
         GET_EXAMS_SUCCESS, 
         GET_EXAMS_ERROR, 
         UPDATE_EXAM_SUCCESS, 
         DELETE_EXAM_SUCCESS, 
         EXAM_SHOW_LOADING } from '../types/examTypes';

const initState = {
    response: null,
    status: '',
    exams: [],
    current_exam: null,
    error: null,
    loading: false    
}

const examReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: CREATE_EXAM_SUCCESS,
                response: action.response
            }
        case CREATE_EXAM_ERROR:    
            return {
                ...state,
                loading: false,
                status: CREATE_EXAM_ERROR,
                error: action.error
            }
        case GET_EXAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_EXAMS_SUCCESS,
                exams: action.response.exams,
                response: action.response
            }
        case GET_EXAMS_ERROR:
            return {
                ...state,
                loading: false,
                status: GET_EXAMS_ERROR,
                exams: [],
                error: action.error
            }
        case GET_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_EXAM_SUCCESS,
                exams: [],
                current_exam: action.exam,
                response: action.response
            }
        case GET_EXAM_ERROR:
            const empty = {
                'exam' : '<---->',                
                'description': '<---->',
                'creator_id': '<---->',
            };
            return {
                ...state,
                loading: false,
                current_exam: empty,
                exams: [],
                status: GET_EXAM_ERROR,
                error: action.error
            }
        case UPDATE_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: UPDATE_EXAM_SUCCESS,
                response: action.response
            }
        case EXAM_SHOW_LOADING:
            return {
                ...state,
                loading: true            
            }
        case DELETE_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: DELETE_EXAM_SUCCESS,                
                response: action.response
            }
        default:
            return state;
    }
}

export default examReducer