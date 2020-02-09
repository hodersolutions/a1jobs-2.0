import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR,
         SHOW_SEARCH_JOBS_LOADING,
         HIDE_SEARCH_JOBS_LOADING } from '../types/searchTypes';

const initState = {    
    jobsStatus: '',
    message: '',
    searchedJobs: []  
}

const searchReducer = (state = initState, action) => {
    switch(action.type) { 
        case SEARCH_JOB_SUCCESS:
            return {
                ...state,
                message: action.response.message,
                searchedJobs: action.response.jobs,
                jobsStatus: SEARCH_JOB_SUCCESS                
            }       
        case SEARCH_JOB_ERROR:
            return {
                ...state,
                message: action.response.message,
                searchedJobs: [],
                jobsStatus: SEARCH_JOB_ERROR
            }
        case SHOW_SEARCH_JOBS_LOADING:
            return {
                ...state,
                message: null,
                jobsStatus: SHOW_SEARCH_JOBS_LOADING                
            }
        case HIDE_SEARCH_JOBS_LOADING:
            return {
                ...state,                
                message: null,
                jobsStatus: HIDE_SEARCH_JOBS_LOADING
            }   
        default:
            return state;
    }
}

export default searchReducer;
