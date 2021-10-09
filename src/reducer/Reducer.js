import { combineReducers } from 'redux';
import apidata, { bottomfun, searchFun } from './ApiData';

const reducer = combineReducers({
    apidata,
    bottomfun,
    searchFun,
});
export default reducer;
