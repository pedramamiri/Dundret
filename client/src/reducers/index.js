import { combineReducers } from 'redux';
import skiReducer          from './skiReducer';
import specifiReducer      from './specifiReducer';
import sizeReducer         from './sizeReducer';

export default combineReducers({
    ski            : skiReducer,
    specification  : specifiReducer,
    size           : sizeReducer
});