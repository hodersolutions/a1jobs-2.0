import JobAPI from '../../api/JobAPI';

import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR,
         SHOW_SEARCH_JOBS_LOADING,
         HIDE_SEARCH_JOBS_LOADING } from '../types/searchTypes';

export const searchJobs = (searchParams) => {    
    let api = new JobAPI();
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SEARCH_JOBS_LOADING });
        api.getJobs(searchParams, {mode: 'cors'})
        .then(response => {
            dispatch({ type: HIDE_SEARCH_JOBS_LOADING });
            if (response.status === 'success')
                dispatch({ type: SEARCH_JOB_SUCCESS, response });            
            else
                dispatch({ type: SEARCH_JOB_ERROR, error: response });            
        });
    }
}
