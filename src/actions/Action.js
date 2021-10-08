export const setapidata =(value)=>{
    return {
        type:"ADD_API_DATA",
        payload:value
    }
}
export const isBottom = (val)=>{
    return{
        type:"BOTTOM_VALUE",
        bottomVal:val
    }
}
export const searchAction = (value)=>{
    return{
        type:"SEARCH",
        searchVal:value
    }
}