import { combineReducers } from 'redux';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
    user: userReducer,    
    search: searchReducer,
    common: commonReducer    
})

export default rootReducer;