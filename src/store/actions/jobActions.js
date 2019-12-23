import axios from 'axios';
import settings from '../../settings';
import {CREATE_JOB_SUCCESS, 
        CREATE_JOB_ERROR, 
        GET_JOBS_SUCCESS, 
        GET_JOBS_ERROR,
        GET_JOB_ERROR,
        GET_JOB_SUCCESS, 
        JOB_SHOW_LOADING } from '../types/jobTypes';

/* Remove Mock Data */
import jobs from '../../mock/JobData';

export const createJob = (job) => {    
    return (dispatch, getState) => {
        dispatch({ type: JOB_SHOW_LOADING });
        axios.post(settings.A1JOBSAPI.url + 'api/v1/jobs', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                },
                mode: 'cors',
                job: job.job,
                parent_job_id: (job.parent_job_id === '')? null : job.parent_job_id,
                is_active: true,
                description: job.description,
                creator_id: job.creator_id
            }
        ).then( function(response) {
            dispatch({ type: CREATE_JOB_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: CREATE_JOB_ERROR, error });
        });        
    }
}

export const getJobs = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: JOB_SHOW_LOADING });
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
            dispatch({ type: GET_JOBS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_JOBS_ERROR, error });
        });         
    }
}

export const getJob = (params) => {
    return (dispatch, getState) => {        
        /* SKIP THIS WITH AXIOS CALL BELOW */
        let selectedJob = jobs.find(x => x.id === parseInt(params.id));        
        if (selectedJob !== undefined)
            dispatch({ type: GET_JOB_SUCCESS, job: selectedJob});
        else
            dispatch({ type: GET_JOB_ERROR, selectedJob });
        /* axios.get(settings.A1JOBSAPI.url + 'api/v1/jobs?id=' + params.id, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'    
            }).then( response => {            
                dispatch({ type: GET_JOB_SUCCESS, job: response.data.job });            
            }).catch(error => {			
                dispatch({ type: GET_JOB_ERROR, error });
            }); */
    }
}

export const showLoading = () => {
    return (dispatch) => {
        dispatch({ type: JOB_SHOW_LOADING });
    }
}