import { combineReducers } from 'redux';
import userReducer from './userReducer';
import jobReducer from './jobReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    user: userReducer,    
    job: jobReducer,
    search: searchReducer
})

export default rootReducer;