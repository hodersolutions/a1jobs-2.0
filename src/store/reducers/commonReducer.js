import { SHOW_STATES_LOADING,
        HIDE_STATES_LOADING,
        SHOW_SUBJECTS_LOADING,
        HIDE_SUBJECTS_LOADING,
        SHOW_QUALIFICATIONS_LOADING,
        HIDE_QUALIFICATIONS_LOADING,
        GET_STATES_SUCCESS,
        GET_STATES_ERROR,
        GET_SUBJECTS_ERROR,
        GET_SUBJECTS_SUCCESS,
        GET_QUALIFICATIONS_ERROR,
        GET_QUALIFICATIONS_SUCCESS
    } from '../types/commonTypes';

const initState = {
    response: null,
    statesStatus: null,
    subjectsStatus: null,
    qualificationsStatus: null,
    states: [],
    subjects:[],
    qualifications: [],
    error: null,
    loading: false    
}

const commonReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_STATES_SUCCESS:
            return {
                ...state,
                loading: false,
                statesStatus: GET_STATES_SUCCESS,
                states: action.response.object,
                response: action.response
            }       
        case GET_STATES_ERROR:    
            return {
                ...state,
                loading: false,
                statesStatus: GET_STATES_ERROR,
                states: [],
                error: action.error
            }
        case GET_SUBJECTS_SUCCESS:    
            return {
                ...state,
                loading: false,
                response: action.response,
                subjectsStatus: GET_SUBJECTS_SUCCESS,
                subjects: action.response.object
            }          
        case GET_SUBJECTS_ERROR:    
            return {
                ...state,
                loading: false,
                response: null,
                subjectsStatus: GET_SUBJECTS_ERROR,
                subjects: [],
                error: action.error
            }
        case GET_QUALIFICATIONS_SUCCESS:    
            return {
                ...state,
                loading: false,
                response: action.response,
                qualificationsStatus: GET_QUALIFICATIONS_SUCCESS,
                qualifications: action.response.object
            }          
        case GET_QUALIFICATIONS_ERROR:    
            return {
                ...state,
                loading: false,
                response: null,
                qualificationsStatus: GET_QUALIFICATIONS_ERROR,
                qualifications: [],
                error: action.error
            }
        case SHOW_STATES_LOADING:
            return {
                ...state,
                response: null,
                statesStatus: SHOW_STATES_LOADING,                
                loading: true,
                error: null
            }
        case HIDE_STATES_LOADING:
            return {
                ...state,
                loading: false,
                response: null,
                statesStatus: HIDE_STATES_LOADING,
                error: null          
            }
        case SHOW_SUBJECTS_LOADING:
            return {
                ...state,
                response: null,
                subjectsStatus: SHOW_SUBJECTS_LOADING,
                loading: true,
                error: null       
            }
        case HIDE_SUBJECTS_LOADING:
            return {
                ...state,
                loading: false,
                response: null,
                subjectsStatus: HIDE_SUBJECTS_LOADING,
                error: null          
            }
        case SHOW_QUALIFICATIONS_LOADING:
            return {
                ...state,
                response: null,
                qualificationsStatus: SHOW_QUALIFICATIONS_LOADING,
                loading: true,
                error: null       
            }
        case HIDE_QUALIFICATIONS_LOADING:
            return {
                ...state,
                loading: false,
                response: null,
                qualificationsStatus: HIDE_QUALIFICATIONS_LOADING,
                error: null          
            }        
        default:
            return state;
    }
}

export default commonReducer
