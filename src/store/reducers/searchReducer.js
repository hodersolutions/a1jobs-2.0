import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR } from '../types/searchTypes';

const initState = {    
    status: '',
    message: '',
    searchJobs: []  
}

const searchReducer = (state = initState, action) => {
    switch(action.type) { 
        case SEARCH_JOB_SUCCESS:
            return {
                ...state,
                message: action.response.message,
                searchJobs: action.response.jobs,
                status: SEARCH_JOB_SUCCESS                
            }       
        case SEARCH_JOB_ERROR:
            return {
                ...state,
                message: action.response.message,
                searchJobs: [],
                status: SEARCH_JOB_ERROR
            }   
        default:
            return state;
    }
}

export default searchReducer;