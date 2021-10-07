import React,{useState,useEffect} from "react";
import Blueprint from "./component/Blueprint";
import Navbar from "./component/Navbar";
function App() {
  const [apiData,setApiData] = useState([])
  //fetch api
  const fetchData = async ()=>{
       let data = await fetch("https://api.spacexdata.com/v3/launches");
       let apiResult = await data.json();
       setApiData(apiResult);
  }
useEffect(() => {
  fetchData();
}, []);
console.log(apiData);
  return (
    <>
    <Navbar />
    <Blueprint apiData={apiData} />
    </>
  );
}

export default App;