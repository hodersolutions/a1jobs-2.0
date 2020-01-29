import { GET_STATES_SUCCESS, 
         GET_STATES_ERROR,
         GET_SUBJECTS_SUCCESS,
         GET_SUBJECTS_ERROR,
         SHOW_LOADING,
         HIDE_LOADING,
         GET_QUALIFICATIONS_ERROR,
         GET_QUALIFICATIONS_SUCCESS
       } from '../types/commonTypes';
import CommonAPI from '../../api/CommonAPI';

const commonApi = new CommonAPI();

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

export const getStates = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        commonApi.getStates({mode: 'cors'})
        .then( response => {            
            dispatch({ type: GET_STATES_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_STATES_ERROR, error });
        });         
    }
}

export const getSubjects = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        commonApi.getSubjects({mode: 'cors'})
        .then( response => {
            dispatch({ type: GET_SUBJECTS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_SUBJECTS_ERROR, error });
        });         
    }
}

export const getQualifications = () => {    
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        commonApi.getQualifications({mode: 'cors'})
        .then( response => {            
            dispatch({ type: GET_QUALIFICATIONS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_QUALIFICATIONS_ERROR, error });
        });
    }
}