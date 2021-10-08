const api_data = (state = [], action) =>{
    if(action.type==="ADD_API_DATA"){
        return  action.payload;
    }else{
        return state; 
    }
}

export const bottomfun = (state=false,action)=>{
   if(action.type === "BOTTOM_VALUE"){
       return action.bottomVal;
   }else{
       return state;
   }
}
export const searchFun = (state="",action)=>{
    if(action.type==="SEARCH"){
      return action.searchVal;
    }else{
        return state;
    }
}
export default api_data;