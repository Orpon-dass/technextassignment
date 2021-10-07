import React,{useState,useEffect} from "react";
import Blueprint from "./component/Blueprint";
import Navbar from "./component/Navbar";
import {useDispatch} from 'react-redux'
import { setapidata } from "./actions/Action";
function App() {
  const [apiData,setApiData] = useState([]);
  //redux code
  const dispatch =useDispatch();
  //fetch api
  const fetchData = async ()=>{
       let data = await fetch("https://api.spacexdata.com/v3/launches");
       let apiResult = await data.json();
        setApiData(apiResult);
       dispatch(setapidata(apiResult))
  }
useEffect(() => {
  fetchData();
}, []);

//pagination code
  const customPagination =()=>{
    const page=14;
    const limit =8;
    const startIndex = (page-1) * limit;
    const endEndex = page * limit;
    const perPageData = apiData.slice(startIndex,endEndex);
    //console.log(perPageData)
    //console.log(apiData.length)
   const fl = apiData.filter((e)=>{
          if(e.flight_number===11){
            return e;
          }   
    });
    console.log(fl)

  }
  customPagination();
  return (
    <>
    <Navbar />
    <Blueprint />
    </>
  );
}

export default App;