import { CREATE_USER_SUCCESS, 
         CREATE_USER_ERROR, 
         GET_USER_SUCCESS,
         GET_USER_ERROR,
         UPDATE_USER_SUCCESS, 
         DELETE_USER_SUCCESS,          
         AUTHENTICATE_USER_SUCCESS, 
         AUTHENTICATE_USER_ERROR,
         SIGNOUT_USER } from '../types/userTypes';

const initState = {
    response: null,
    status: '',
    users: [],
    token: null,
    is_authenticated: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case SIGNOUT_USER:
            return {
                ...state,
                token: null,
                username: null,
                is_authenticated: false,
                status: SIGNOUT_USER,
            }       
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                token: action.response['access_token'],                
                response: action.response,
                is_authenticated: true,
                status: AUTHENTICATE_USER_SUCCESS
            }
        case AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                response: action.error,
                status: AUTHENTICATE_USER_ERROR
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                status: CREATE_USER_SUCCESS,
                response: action.response
            }            
        case CREATE_USER_ERROR:
            return {
                ...state,
                status: CREATE_USER_ERROR,
                response: action.error
            }        
        case GET_USER_SUCCESS:
            return {                                
                ...state,
                response: action.response,
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
        default:
            return state;
    }
}

export default userReducer;