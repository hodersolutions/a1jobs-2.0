import axios from 'axios';
import settings from '../../settings';
import { GET_STATES_SUCCESS, 
         GET_STATES_ERROR,
         GET_SUBJECTS_SUCCESS,
         GET_SUBJECTS_ERROR,
         SHOW_LOADING,
         HIDE_LOADING,
         RESET_ERROR
       } from '../types/commonTypes';

// import { resetState, resetDistrict, resetTown, resetSubject } from '../../components/common/Constants';

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

export const resetError = () => {
    return (dispatch) => {
        dispatch({ type: RESET_ERROR });
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
