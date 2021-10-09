const apidata = (state = [], action) => {
    if (action.type === 'ADD_API_DATA') {
        return action.payload;
    }
    return state;
};

export const bottomfun = (state = false, action) => {
    if (action.type === 'BOTTOM_VALUE') {
        return action.bottomVal;
    }
    return state;
};
export const searchFun = (state = '', action) => {
    if (action.type === 'SEARCH') {
        return action.searchVal;
    }
    return state;
};
export default apidata;
