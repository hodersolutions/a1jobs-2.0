import axios from 'axios';
import settings from '../../settings';
import JWT from '../../components/common/JWT';

import { CREATE_USER_SUCCESS,
         CREATE_USER_ERROR,
         GET_USER_ERROR,
         GET_USER_SUCCESS,
         UPDATE_USER_SUCCESS,
         AUTHENTICATE_USER_ERROR,
         AUTHENTICATE_USER_SUCCESS,
         SIGNOUT_USER } from '../types/userTypes';

import { HIDE_LOADING, SHOW_LOADING } from '../types/commonTypes';

export const updateUser = (user) => {
    return (dispatch, getState) => { 
        dispatch({ type: HIDE_LOADING });        
        dispatch({ type: UPDATE_USER_SUCCESS, user });
    }
}

export const createUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });        
        axios.post(settings.A1JOBSAPI.url + 'api/v1/register', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'role_keyword': (user.role_keyword === true ? 'recruiter' : 'seeker')                    
                },
                mode: 'cors',
                mobile: user.mobile,
                email: user.email,
                password: user.password
            }
        ).then( response => {
                dispatch({ type: HIDE_LOADING }); 
                if(response.data['status'] === 'success')
                    dispatch({ type: CREATE_USER_SUCCESS, response: response.data });
                else
                    dispatch({ type: CREATE_USER_ERROR, error: response.response.response.data });                             
            }
        ).catch(error => {
            dispatch({ type: HIDE_LOADING }); 
            dispatch({ type: CREATE_USER_ERROR, error: error.response });
        });
    }
}

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });   
        const jwt = JWT.get_jwt();        
        axios.get(settings.A1JOBSAPI.url + 'api/v1/users/mobile?mobile=' + jwt['mobile'], {
            headers: {
                'Content-Type': 'application/json',
                access_token: jwt['access_token'],
                mobile: jwt['mobile']
            },
            mode: 'cors'
        }).then( response => {
            dispatch({ type: HIDE_LOADING }); 
            dispatch({ type: GET_USER_SUCCESS, response: response.data });
        }
        ).catch(error => {
            dispatch({ type: HIDE_LOADING }); 
            dispatch({ type: GET_USER_ERROR, error });
        });
    }
}

export const authenticateUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        axios.post(settings.A1JOBSAPI.url + 'api/v1/login', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                },
                mode: 'cors',
                email: user.loginId,
                mobile: user.loginId,
                password: user.password
            }
        ).then( response => {
            dispatch({ type: HIDE_LOADING }); 
            if(response.data['status'] === 'success') {                
                // Ask user if he/she is okay to save local cookies then save the access_token to localStorage by 
                // JWT.set_jwt(response.data['access_token'], response.data['mobile'])
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }
            else {
                // Do this, JWT.remove_jwt(); if JWT.set_jwt() is done above
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.response.data });
            }
        }
        ).catch(error => {
            dispatch({ type: HIDE_LOADING }); 
            // Do this, JWT.remove_jwt(); if JWT.set_jwt() is done above
            dispatch({ type: AUTHENTICATE_USER_ERROR, error: error.response });
        });        
    }
}

export const signOutUser = (auth) => {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });
        dispatch({ type: SIGNOUT_USER, auth });
        dispatch({ type: HIDE_LOADING });                 
    }
}

export const validateToken = (auth) => {
    return (dispatch, getState) => { 
        dispatch({ type: SHOW_LOADING });       
        axios.post(settings.A1JOBSAPI.url + 'api/v1/access_token/validate', {
            headers: {
                'Content-Type': 'application/json',
                access_token: auth['access_token'],
                mobile: auth['mobile']
            },
            mode: 'cors',
            mobile: auth['mobile']
        }).then( response => {
            dispatch({ type: HIDE_LOADING }); 
            if(response.data['status'] === 'success') {
                response.data['access_token'] = auth['access_token'];
                response.data['mobile'] = auth['mobile']; 
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }                                            
            else {
                JWT.remove_jwt();
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.data });
            }
        }).catch(error => {
            dispatch({ type: HIDE_LOADING }); 
            JWT.remove_jwt();
            dispatch({ type: AUTHENTICATE_USER_ERROR, error });
        });
    }
}