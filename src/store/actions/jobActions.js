import axios from 'axios';
import settings from '../../settings';
import { CREATE_JOB_SUCCESS, 
         CREATE_JOB_ERROR, 
         GET_JOBS_SUCCESS, 
         GET_JOBS_ERROR,
         GET_JOB_ERROR,
         GET_JOB_SUCCESS } from '../types/jobTypes';

import { SHOW_LOADING, HIDE_LOADING } from '../types/commonTypes';

export const createJob = (job) => {    
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });        
        axios.post(settings.A1JOBSAPI.url + 'api/v1/requisitions', job, {
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.getItem('access_token'),
                'username': localStorage.getItem('username')
            },
            mode: 'cors',                
            parent_job_id: (job.parent_job_id === '')? null : job.parent_job_id,
            is_active: true,
            description: job.description,
            creator_id: job.creator_id
        }
        ).then( function(response) {
            dispatch({ type: HIDE_LOADING });
            dispatch({ type: CREATE_JOB_SUCCESS, response });
        }).catch(error => {
            dispatch({ type: HIDE_LOADING });			
            dispatch({ type: CREATE_JOB_ERROR, error });
        });
    }
}

export const getJobs = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        var full_uri = settings.A1JOBSAPI.url + 'api/v1/jobs'; 
		if (params.creator_id === '')
			full_uri = full_uri + '/latest/' + params.count
		else
			full_uri = full_uri + '/creator/' + params.creator_id +'/latest/' + params.count

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {
            dispatch({ type: HIDE_LOADING });											            
            dispatch({ type: GET_JOBS_SUCCESS, response });
		}).catch(error => {
            dispatch({ type: HIDE_LOADING });
            dispatch({ type: GET_JOBS_ERROR, error });
        });         
    }
}

export const getJob = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });        
        axios.get(settings.A1JOBSAPI.url + 'api/v1/requisition/' + params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'    
        }).then( response => {
            dispatch({ type: HIDE_LOADING }); 
            dispatch({ type: GET_JOB_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: HIDE_LOADING }); 
            dispatch({ type: GET_JOB_ERROR, error });
        });
    }
}