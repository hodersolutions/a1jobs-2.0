import axios from 'axios';
import settings from '../../settings';
import { GET_STATES_SUCCESS, 
         GET_STATES_ERROR,
         GET_SUBJECTS_SUCCESS,
         GET_SUBJECTS_ERROR,
         SHOW_LOADING,
         HIDE_LOADING,
         GET_QUALIFICATIONS_ERROR,
         GET_QUALIFICATIONS_SUCCESS
       } from '../types/commonTypes';

export const showLoading = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_LOADING });
    }
}

export const hideLoading = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_LOADING });
    }
}

export const getStates = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        var full_uri = settings.A1JOBSAPI.url + 'api/v1/states/all'; 

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {            
            dispatch({ type: GET_STATES_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_STATES_ERROR, error });
        });         
    }
}

export const getSubjects = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        var full_uri = settings.A1JOBSAPI.url + 'api/v1/subjects/all'; 

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {
            dispatch({ type: GET_SUBJECTS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_SUBJECTS_ERROR, error });
        });         
    }
}

export const getQualifications = (params) => {
    console.log('here in qualifications')
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        var full_uri = settings.A1JOBSAPI.url + 'api/v1/qualifications/all'; 

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {
            console.log(response)
            dispatch({ type: GET_QUALIFICATIONS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_QUALIFICATIONS_ERROR, error });
        });         
    }
}