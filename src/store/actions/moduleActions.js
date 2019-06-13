import axios from 'axios';
import settings from '../../settings';
import {CREATE_MODULE_SUCCESS, 
        CREATE_MODULE_ERROR, 
        GET_MODULES_SUCCESS, 
        GET_MODULES_ERROR,
        GET_MODULE_ERROR,
        GET_MODULE_SUCCESS, 
        MODULE_SHOW_LOADING } from '../types/moduleTypes';

export const createModule = (module) => {    
    return (dispatch, getState) => {
        dispatch({ type: MODULE_SHOW_LOADING });
        axios.post(settings.QUESTIONBANKAPI.url + 'api/v1/modules', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                },
                mode: 'cors',
                module: module.module,
                parent_module_id: (module.parent_module_id === '')? null : module.parent_module_id,
                is_active: true,
                description: module.description,
                creator_id: module.creator_id
            }
        ).then( function(response) {
            dispatch({ type: CREATE_MODULE_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: CREATE_MODULE_ERROR, error });
        });        
    }
}

export const getModules = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: MODULE_SHOW_LOADING });
        var full_uri = settings.QUESTIONBANKAPI.url + 'api/v1/modules'; 
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
            dispatch({ type: GET_MODULES_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_MODULES_ERROR, error });
        });         
    }
}

export const getModule = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: MODULE_SHOW_LOADING });
        axios.get(settings.QUESTIONBANKAPI.url + 'api/v1/modules?id=' + params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'    
        }).then( response => {            
            dispatch({ type: GET_MODULE_SUCCESS, module: response.data.module });            
        }).catch(error => {			
            dispatch({ type: GET_MODULE_ERROR, error });
        });
    }
}