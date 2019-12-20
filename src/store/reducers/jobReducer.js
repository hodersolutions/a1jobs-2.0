import { CREATE_JOB_SUCCESS,
         CREATE_JOB_ERROR,
         GET_JOB_SUCCESS, 
         GET_JOB_ERROR, 
         GET_JOBS_SUCCESS, 
         GET_JOBS_ERROR, 
         UPDATE_JOB_SUCCESS, 
         DELETE_JOB_SUCCESS, 
         JOB_SHOW_LOADING } from '../types/jobTypes';

const initState = {
    response: null,
    status: '',
    jobs: [],
    current_job: null,
    error: null,
    loading: true    
}

const jobReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                status: CREATE_JOB_SUCCESS,
                response: action.response
            }
        case CREATE_JOB_ERROR:    
            return {
                ...state,
                loading: false,
                status: CREATE_JOB_ERROR,
                error: action.error
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_JOBS_SUCCESS,
                jobs: action.response.jobs,
                response: action.response
            }
        case GET_JOBS_ERROR:
            return {
                ...state,
                loading: false,
                status: GET_JOBS_ERROR,
                jobs: [],
                error: action.error
            }
        case GET_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_JOB_SUCCESS,
                jobs: [],
                current_job: action.job,
                response: action.response
            }
        case GET_JOB_ERROR:
            const empty = {
                'job' : '<---->',                
                'description': '<---->',
                'creator_id': '<---->',
            };
            return {
                ...state,
                loading: false,
                current_job: empty,
                jobs: [],
                status: GET_JOB_ERROR,
                error: action.error
            }
        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                status: UPDATE_JOB_SUCCESS,
                response: action.response
            }
        case JOB_SHOW_LOADING:
            return {
                ...state,
                status: JOB_SHOW_LOADING,
                loading: true            
            }
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                status: DELETE_JOB_SUCCESS,                
                response: action.response
            }
        default:
            return state;
    }
}

export default jobReducer