import { SHOW_LOADING,
        HIDE_LOADING,        
        GET_STATES_SUCCESS,
        GET_STATES_ERROR,
        GET_SUBJECTS_ERROR,
        GET_SUBJECTS_SUCCESS
    } from '../types/commonTypes';

const initState = {
    response: null,
    status: null,
    states: [],
    subjects:[],
    error: null,
    loading: false    
}

const commonReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_STATES_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_STATES_SUCCESS,
                states: action.response.object,
                response: action.response
            }       
        case GET_STATES_ERROR:    
            return {
                ...state,
                loading: false,
                status: GET_STATES_ERROR,
                states: [],
                error: action.error
            }
        case GET_SUBJECTS_SUCCESS:    
            return {
                ...state,
                loading: false,
                response: action.response,
                status: GET_SUBJECTS_SUCCESS,
                subjects: action.response.object
            }          
        case GET_SUBJECTS_ERROR:    
            return {
                ...state,
                loading: false,
                response: null,
                status: GET_SUBJECTS_ERROR,
                subjects: [],
                error: action.error
            }
        case SHOW_LOADING:
            return {
                ...state,
                response: null,
                status: null,
                loading: true,
                error: null       
            }
        case HIDE_LOADING:
            return {
                ...state,
                loading: false,
                response: null,
                status: null,
                error: null          
            }
        default:
            return state;
    }
}

export default commonReducer