import axios from 'axios';
import settings from '../../settings';

import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR } from '../types/searchTypes';

import { SHOW_LOADING, HIDE_LOADING } from '../types/commonTypes';

export const searchJob = (search) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });           
        axios.post(settings.A1JOBSAPI.url + 'api/v1/search', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'                    
                },
                mode: 'cors',
                searchToken: search.searchToken
            }
        ).then( response => {
                dispatch({ type: HIDE_LOADING }); 
                if(response.data['status'] === 'success')
                    dispatch({ type: SEARCH_JOB_SUCCESS, response: response.data });
                else
                    dispatch({ type: SEARCH_JOB_ERROR, error: response.response.response.data });                             
            }
        ).catch(error => {
            dispatch({ type: HIDE_LOADING }); 			
            dispatch({ type: SEARCH_JOB_ERROR, error: error.response });
        });            
    }
}