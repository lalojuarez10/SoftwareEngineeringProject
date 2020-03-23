// bring together all reducers
// authentication reducers, error reducers, etc here they meet 
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    product: productReducer
});

// exporting a combinedReducer which we passed in an object with all the different reducers 
