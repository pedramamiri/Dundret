import { combineReducers } from 'redux';
import skiReducer from './skiReducer';

export default combineReducers({
    ski: skiReducer
});