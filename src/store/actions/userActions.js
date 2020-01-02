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
         USER_SHOW_LOADING,
         SIGNOUT_USER } from '../types/userTypes';

export const updateUser = (user) => {
    return (dispatch, getState) => {        
        dispatch({ type: UPDATE_USER_SUCCESS, user });
    }
}

export const createUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });           
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
                dispatch({ type: CREATE_USER_SUCCESS, response: response.data });
            }
        ).catch(error => {			
            dispatch({ type: CREATE_USER_ERROR, error });
        });            
    }
}

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });   
        const jwt = JWT.get_jwt();
        axios.get(settings.A1JOBSAPI.url + 'api/v1/users/mobile?mobile=' + jwt['mobile'], {
            headers: {
                'Content-Type': 'application/json',
                token: jwt['token'],
                mobile: jwt['mobile']
            },
            mode: 'cors'
        }).then( response => {
            dispatch({ type: GET_USER_SUCCESS, response: response.data });
        }
        ).catch(error => {			
            dispatch({ type: GET_USER_ERROR, error });
        });
    }
}

export const authenticateUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });        
        axios.post(settings.A1JOBSAPI.url + 'api/v1/login', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                },
                mode: 'cors',
                email: user.email_mobile,
                mobile: user.email_mobile,
                password: user.password
            }
        ).then( response => {
            if(response.data['status'] === 'success') {                
                // Ask user if he/she is okay to save local cookies then save the token to localStorage by 
                JWT.set_jwt(response.data['access_token'], response.data['mobile'])
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }
            else {
                // Do this, JWT.remove_jwt(); if JWT.set_jwt() is done above
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.data });
            }
        }
        ).catch(error => {
            // Do this, JWT.remove_jwt(); if JWT.set_jwt() is done above
            dispatch({ type: AUTHENTICATE_USER_ERROR, error });
        });        
    }
}

export const signOutUser = (auth) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });
        dispatch({ type: SIGNOUT_USER, auth });                
    }
}

export const validateToken = (auth) => {
    return (dispatch, getState) => { 
        dispatch({ type: USER_SHOW_LOADING });       
        axios.post(settings.A1JOBSAPI.url + 'api/v1/token/validate', {
            headers: {
                'Content-Type': 'application/json',
                token: auth['token'],
                mobile: auth['mobile']
            },
            mode: 'cors',
            mobile: auth['mobile']
        }).then( response => {
            if(response.data['status'] === 'success') {
                response.data['auth_token'] = auth['token'];
                response.data['mobile'] = auth['mobile']; 
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }                                            
            else {
                JWT.remove_jwt();
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.data });
            }
        }).catch(error => {
            JWT.remove_jwt();
            dispatch({ type: AUTHENTICATE_USER_ERROR, error });
        });
    }
}