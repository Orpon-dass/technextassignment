import { combineReducers } from "redux";
import api_data from "../reducer/ApiData"

const reducer = combineReducers(
    {
        api_data,
    }
);
export default reducer;