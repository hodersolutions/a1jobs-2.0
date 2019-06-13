import { combineReducers } from 'redux';
import userReducer from './userReducer';
import moduleReducer from './moduleReducer';
import questionReducer from './questionReducer';
import examReducer from './examReducer';

const rootReducer = combineReducers({
    user: userReducer,    
    module: moduleReducer,
    question: questionReducer,
    exam: examReducer
})

export default rootReducer;