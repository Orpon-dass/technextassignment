const api_data = (state = [], action) =>{
    if(action.type==="ADD_API_DATA"){
        return  action.payload;
    }else{
        return state; 
    }
}

export default api_data;