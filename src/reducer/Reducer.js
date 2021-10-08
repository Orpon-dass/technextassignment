import { combineReducers } from "redux";
import api_data from "../reducer/ApiData"
import {bottomfun,searchFun} from "../reducer/ApiData"

const reducer = combineReducers(
    {
        api_data,
        bottomfun,
        searchFun
    }
);
export default reducer;