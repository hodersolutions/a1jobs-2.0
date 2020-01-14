import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR } from '../types/searchTypes';

const initState = {
    response: null,
    status: '',
    searchResults: []  
}

const searchReducer = (state = initState, action) => {
    switch(action.type) { 
        case SEARCH_JOB_SUCCESS:
            return {
                ...state,
                response: action.response,
                searchResults: action.response,           
                status: SEARCH_JOB_SUCCESS,
                loading: false
            }       
        case SEARCH_JOB_ERROR:
            return {
                ...state,
                response: action.response,
                loading: false,
                status: SEARCH_JOB_ERROR
            }   
        default:
            return state;
    }
}

export default searchReducer;