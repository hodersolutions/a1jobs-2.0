import { CREATE_USER_SUCCESS, 
         CREATE_USER_ERROR, 
         GET_USER_SUCCESS,
         GET_USER_ERROR,
         UPDATE_USER_SUCCESS, 
         DELETE_USER_SUCCESS,          
         AUTHENTICATE_USER_SUCCESS, 
         AUTHENTICATE_USER_ERROR,
         RESET_USER_STATUS,
         SIGNOUT_USER } from '../types/userTypes';

const initState = {
    response: null,
    status: '',
    users: [],
    logged_user: null,
    access_token: null
}

const userReducer = (state = initState, action) => {
    let response = null;
    switch(action.type) {
        case SIGNOUT_USER:
            return {
                ...state,
                access_token: null,
                logged_user: null,
                status: SIGNOUT_USER,
            }       
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                access_token: action.response['access_token'],                
                response: action.response,
                logged_user: action.response.user,
                status: AUTHENTICATE_USER_SUCCESS
            }
        case AUTHENTICATE_USER_ERROR:            
            if (action.error.response !== undefined)
                response = action.error.response.data;
            else
                response = action.error;
            return {
                ...state,
                response: response,
                logged_user: null,
                status: AUTHENTICATE_USER_ERROR
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                status: CREATE_USER_SUCCESS,
                logged_user: null,
                response: action.response
            }            
        case CREATE_USER_ERROR:            
            if (action.error.response !== undefined)
                response = action.error.response.data;
            else
                response = action.error;
            return {
                ...state,
                status: CREATE_USER_ERROR,
                logged_user: null,
                response: response
            }        
        case GET_USER_SUCCESS:
            return {                                
                ...state,
                response: action.response,
                logged_user: action.response.user,
                status: GET_USER_SUCCESS
            }
        case GET_USER_ERROR:
            return {
                ...state,                
                response: action.error,
                status: GET_USER_ERROR
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                status: UPDATE_USER_SUCCESS,
                response: action.response                
            }            
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                response: action.response
            } 
        case RESET_USER_STATUS:
            return {
                ...state,
                response: null,
                loading: false,
                status: RESET_USER_STATUS
            }           
        default:
            return state;
    }
}

export default userReducer;