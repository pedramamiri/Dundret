import { combineReducers } from 'redux';
import skiReducer          from './skiReducer';
import specifiReducer      from './specifiReducer';
import sizeReducer         from './sizeReducer';
import checkoutReducer     from './checkoutReducer';

export default combineReducers({
    ski            : skiReducer,
    specification  : specifiReducer,
    size           : sizeReducer,
    checkout       : checkoutReducer
});