import axios from 'axios';
import settings from '../../settings';
import JWT from '../../components/common/JWT';
import UserAPI from '../../api/UserAPI';

import { AUTHENTICATE_USER_ERROR,
         AUTHENTICATE_USER_SUCCESS,
         RESET_USER_STATUS,
         SIGNOUT_USER } from '../types/userTypes';

import { HIDE_LOADING, SHOW_LOADING } from '../types/commonTypes';

export const resetUserStatus = () => {
    return (dispatch) => {
        dispatch({ type: RESET_USER_STATUS });
    }
}

export const authenticateUser = (user) => {
    let api = new UserAPI();
    return (dispatch, getState) => {
        dispatch({ type: SHOW_LOADING });        
        api.authenticateUser({ email: user.loginId, mobile: user.loginId, password: user.password }, {mode: 'cors'})
        .then( response => {
            dispatch({ type: HIDE_LOADING });            
            if (response.status === 'success') {
                // Ask user if he/she is okay to save local cookies then save the access_token to localStorage by 
                // JWT.set_jwt(response.data['access_token'], response.data['mobile'])
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response });
            }
            else {
                // Do this, JWT.remove_jwt(); if JWT.set_jwt() is done above       
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response });
            }
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
