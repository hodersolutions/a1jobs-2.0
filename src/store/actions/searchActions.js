import JobAPI from '../../api/JobAPI';

import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR } from '../types/searchTypes';

import { SHOW_LOADING, HIDE_LOADING } from '../types/commonTypes';

export const searchJobs = (searchParams) => {    
    let api = new JobAPI();
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        api.getJobs(searchParams, {mode: 'cors'})
        .then(response => {
            dispatch({ type: HIDE_LOADING }); 
            if (response.status === 'success')
                dispatch({ type: SEARCH_JOB_SUCCESS, response });            
            else                
                dispatch({ type: SEARCH_JOB_ERROR, error: response });            
        });
    }
}