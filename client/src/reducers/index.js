import { combineReducers } from 'redux';
import skiReducer          from './skiReducer';
import specifiReducer      from './specifiReducer';

export default combineReducers({
    ski: skiReducer,
    specification:specifiReducer
});