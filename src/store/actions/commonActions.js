import { GET_STATES_SUCCESS, 
         GET_STATES_ERROR,
         GET_SUBJECTS_SUCCESS,
         GET_SUBJECTS_ERROR,
         SHOW_STATES_LOADING,
         HIDE_STATES_LOADING,
         SHOW_SUBJECTS_LOADING,
         HIDE_SUBJECTS_LOADING,
         SHOW_QUALIFICATIONS_LOADING,
         HIDE_QUALIFICATIONS_LOADING,
         GET_QUALIFICATIONS_ERROR,
         GET_QUALIFICATIONS_SUCCESS
       } from '../types/commonTypes';
import CommonAPI from '../../api/CommonAPI';

const commonApi = new CommonAPI();

export const showStatesLoading = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_STATES_LOADING });
    }
}

export const hideStatesLoading = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_STATES_LOADING });
    }
}

export const showSubjectsLoading = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SUBJECTS_LOADING });
    }
}

export const hideSubjectsLoading = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_SUBJECTS_LOADING });
    }
}


export const showQualificationsLoading = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_QUALIFICATIONS_LOADING });
    }
}

export const hideQualificationsLoading = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_QUALIFICATIONS_LOADING });
    }
}

export const getStates = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_STATES_LOADING });
        commonApi.getStates({mode: 'cors'})
        .then( response => {
            dispatch({ type: HIDE_STATES_LOADING });
            response = response.data;
            if (response.status === 'success')
                dispatch({ type: GET_STATES_SUCCESS, response });         
            else                
                dispatch({ type: GET_STATES_ERROR, error: response }); 
        });         
    }
}

export const getSubjects = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_SUBJECTS_LOADING });
        commonApi.getSubjects({mode: 'cors'})
        .then( response => {
            dispatch({ type: HIDE_SUBJECTS_LOADING });
            response = response.data;
            if (response.status === 'success')
                dispatch({ type: GET_SUBJECTS_SUCCESS, response });         
            else                
                dispatch({ type: GET_SUBJECTS_ERROR, error: response });
        });         
    }
}

export const getQualifications = () => {    
    return (dispatch, getState) => {
        dispatch({ type: SHOW_QUALIFICATIONS_LOADING });
        commonApi.getQualifications({mode: 'cors'})
        .then( response => {
            dispatch({ type: HIDE_QUALIFICATIONS_LOADING });
            response = response.data;
            if (response.status === 'success')
                dispatch({ type: GET_QUALIFICATIONS_SUCCESS, response });         
            else                
                dispatch({ type: GET_QUALIFICATIONS_ERROR, error: response });
        });
    }
}
