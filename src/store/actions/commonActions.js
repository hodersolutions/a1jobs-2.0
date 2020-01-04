import { SHOW_LOADING, HIDE_LOADING, RESET_ERROR } from '../types/commonTypes';

export const showLoading = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_LOADING });
    }
}

export const hideLoading = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_LOADING });
    }
}

export const resetError = () => {
    return (dispatch) => {
        dispatch({ type: RESET_ERROR });
    }
}