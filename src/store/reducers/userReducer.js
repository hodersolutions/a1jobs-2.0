import { AUTHENTICATE_USER_SUCCESS, 
         AUTHENTICATE_USER_ERROR,
         RESET_USER_STATUS,
         SIGNOUT_USER, 
         FETCH_USER_PROFILES_ERROR,
         FETCH_USER_PROFILES_SUCCESS } from '../types/userTypes';

const initState = {
    response: null,
    status: '',    
    logged_user: null,
    access_token: null,
    profiles: []
}

const userReducer = (state = initState, action) => {
    let response = null;
    switch(action.type) {
        case SIGNOUT_USER:
            return {
                ...state,
                response: null,
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
        case FETCH_USER_PROFILES_SUCCESS:            
            return {
                ...state,
                profiles: action.response.data.object,                
                status: FETCH_USER_PROFILES_SUCCESS,
                response: action.response
            }
        case FETCH_USER_PROFILES_ERROR:
            return {
                ...state,
                profiles: [],
                status: FETCH_USER_PROFILES_ERROR,
                response: action.error
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