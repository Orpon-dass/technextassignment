export const setapidata = (ApiValue) => ({
    type: 'ADD_API_DATA',
    payload: ApiValue,
});
export const isBottom = (val) => ({
    type: 'BOTTOM_VALUE',
    bottomVal: val,
});
export const searchAction = (value) => ({
    type: 'SEARCH',
    searchVal: value,
});
