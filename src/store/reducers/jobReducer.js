import { CREATE_JOB_SUCCESS,
         CREATE_JOB_ERROR,
         GET_JOB_SUCCESS, 
         GET_JOB_ERROR, 
         GET_JOBS_SUCCESS, 
         GET_JOBS_ERROR, 
         APPLY_JOB_SUCCESS,
         APPLY_JOB_ERROR,
         UPDATE_JOB_SUCCESS, 
         DELETE_JOB_SUCCESS,
         RESET_JOB_STATUS } from '../types/jobTypes';

const initState = {
    response: null,
    status: '',
    jobs: [],
    current_job: null
}

const jobReducer = (state = initState, action) => {
    let response = null;
    switch(action.type) {
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                status: CREATE_JOB_SUCCESS,
                response: action.response
            }
        case CREATE_JOB_ERROR:    
            return {
                ...state,
                status: CREATE_JOB_ERROR,
                response: action.error
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                status: GET_JOBS_SUCCESS,
                jobs: action.response.data.requisitions,
                response: action.response
            }
        case GET_JOBS_ERROR:
            return {
                ...state,
                status: GET_JOBS_ERROR,
                jobs: [],
                response: action.error
            }
        case GET_JOB_SUCCESS:
            return {
                ...state,
                status: GET_JOB_SUCCESS,
                jobs: [],
                current_job: action.response.data.requisition,
                response: action.response
            }
        case GET_JOB_ERROR:            
            return {
                ...state,
                current_job: null,
                jobs: [],
                status: GET_JOB_ERROR,                
                response: action.error
            }
        case APPLY_JOB_SUCCESS:
            state.current_job.isapplied = true;
            return {
                ...state,
                status: APPLY_JOB_SUCCESS,
                jobs: [],                
                response: action.response
            }
        case APPLY_JOB_ERROR:
            if (action.error.response !== undefined)
                response = action.error.response.data;
            else
                response = action.error;            
            return {
                ...state,
                jobs: [],
                status: APPLY_JOB_ERROR,                
                response: response
            }
        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                status: UPDATE_JOB_SUCCESS,
                response: action.response
            }
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                status: DELETE_JOB_SUCCESS,                
                response: action.response
            }
        case RESET_JOB_STATUS:
            return {
                ...state,
                response: null,
                loading: false,
                status: RESET_JOB_STATUS
            }    
        default:
            return state;
    }
}

export default jobReducer