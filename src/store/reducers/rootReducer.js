import { combineReducers } from 'redux';
import userReducer from './userReducer';
import jobReducer from './jobReducer';

const rootReducer = combineReducers({
    user: userReducer,    
    job: jobReducer
})

export default rootReducer;