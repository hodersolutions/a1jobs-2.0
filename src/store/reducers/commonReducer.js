import { SHOW_LOADING, HIDE_LOADING, RESET_ERROR } from '../types/commonTypes';

const initState = {
    loading: false    
}

const commonReducer = (state = initState, action) => {
    switch(action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                loading: true           
            }
        case HIDE_LOADING:
            return {
                ...state,
                loading: false           
            }
        case RESET_ERROR:
            return {
                ...state,
                response: null,
                loading: false,
                status: RESET_ERROR
            }  
        default:
            return state;
    }
}

export default commonReducer