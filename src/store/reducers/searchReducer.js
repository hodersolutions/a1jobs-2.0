import { SEARCH_JOB_SUCCESS, 
         SEARCH_JOB_ERROR } from '../types/searchTypes';

import { RESET_ERROR, SHOW_LOADING } from '../types/commonTypes';

const initState = {
    response: null,
    status: '',
    searchResults: [],
    loading: false    
}

const searchReducer = (state = initState, action) => {
switch(action.type) {
   case SHOW_LOADING:
       return {
           ...state,
           loading: true
       }
   case RESET_ERROR:
       return {
           ...state,
           response: null,
           status: RESET_ERROR
       }            
   case SEARCH_JOB_SUCCESS:
       return {
           ...state,
           response: action.response,
           searchResults: action.response,           
           status: SEARCH_JOB_SUCCESS,
           loading: false
       }       
   case SEARCH_JOB_ERROR:
       return {
           ...state,
           response: action.response,
           loading: false,
           status: SEARCH_JOB_ERROR
       }   
   default:
       return state;
}
}

export default searchReducer;