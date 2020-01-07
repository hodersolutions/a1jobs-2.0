import { combineReducers } from 'redux';
import userReducer from './userReducer';
import jobReducer from './jobReducer';
import searchReducer from './searchReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
    user: userReducer,    
    job: jobReducer,
    search: searchReducer,
    commondata: commonReducer
})

export default rootReducer;