import { CREATE_MODULE_SUCCESS, CREATE_MODULE_ERROR, GET_MODULE_SUCCESS, GET_MODULE_ERROR, GET_MODULES_SUCCESS, GET_MODULES_ERROR, UPDATE_MODULE_SUCCESS, DELETE_MODULE_SUCCESS, MODULE_SHOW_LOADING } from '../types/moduleTypes';

const initState = {
    response: null,
    status: '',
    modules: [],
    current_module: null,
    error: null,
    loading: false    
}

const moduleReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_MODULE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: CREATE_MODULE_SUCCESS,
                response: action.response
            }
        case CREATE_MODULE_ERROR:    
            return {
                ...state,
                loading: false,
                status: CREATE_MODULE_ERROR,
                error: action.error
            }
        case GET_MODULES_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_MODULES_SUCCESS,
                modules: action.response.modules,
                response: action.response
            }
        case GET_MODULES_ERROR:
            return {
                ...state,
                loading: false,
                status: GET_MODULES_ERROR,
                modules: [],
                error: action.error
            }
        case GET_MODULE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_MODULE_SUCCESS,
                modules: [],
                current_module: action.module,
                response: action.response
            }
        case GET_MODULE_ERROR:
            const empty = {
                'module' : '<---->',
                'parent_module_id' : '<---->',
                'description': '<---->',
                'creator_id': '<---->',
            };
            return {
                ...state,
                loading: false,
                current_module: empty,
                modules: [],
                status: GET_MODULE_ERROR,
                error: action.error
            }
        case UPDATE_MODULE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: UPDATE_MODULE_SUCCESS,
                response: action.response
            }
        case MODULE_SHOW_LOADING:
            return {
                ...state,
                loading: true            
            }
        case DELETE_MODULE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: DELETE_MODULE_SUCCESS,                
                response: action.response
            }
        default:
            return state;
    }
}

export default moduleReducer