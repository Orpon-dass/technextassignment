import React,{useState,useEffect} from "react";
import Blueprint from "./component/Blueprint";
import Navbar from "./component/Navbar";
import {useDispatch,useSelector} from 'react-redux'
import { setapidata,isBottom } from "./actions/Action";
function App() {
  const [apiData,setApiData] = useState([]);
  const [page,setpage] = useState(1);
  const [pagedata, setPagedata] = useState([]);
  //redux code
  const dispatch =useDispatch();
  //fetch api
useEffect(() => {
  const fetchData = async ()=>{
    let data = await fetch("https://api.spacexdata.com/v3/launches");
    let apiResult = await data.json();
     setApiData((apiData)=>[...apiData,...apiResult]);
     dispatch(setapidata(apiResult.slice(0,8)))

}
  fetchData();
}, []);

 //set page number
 useEffect(()=>{
  function handleScroll() {
    const {scrollHeight,clientHeight,scrollTop}=document.documentElement;
    const ScTopCliheight=Math.round(scrollTop+clientHeight+2);
    if(ScTopCliheight>=scrollHeight){
      setpage(page+1)
    } 
  }
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
});
useEffect(() => {
    const limit = 8;
    const startIndex = (page-1) * limit;
    const endEndex = page * limit;
    const perPageData = apiData.slice(startIndex,endEndex);
    if(page <15){
      setPagedata((pagedata)=>[...pagedata,...perPageData])
      dispatch(setapidata(pagedata))
    }
    if(page===14){
      dispatch(isBottom(true));
    }
     
}, [page]);
//search by rocket name
const searchvalue= useSelector((state)=>state.searchFun);

useEffect(() => {
  const searchByRocketName = (search_value)=>{
    const finalSearchValuev = apiData.filter((data)=>{
          if(data.rocket.rocket_name.toString().toLowerCase().includes(search_value.toString().toLowerCase())){
            return data;
          }
    });
    dispatch(setapidata(finalSearchValuev))
   console.log(finalSearchValuev)
  }
  searchByRocketName(searchvalue)
}, [searchvalue])

  return (
    <>
    <Navbar />
    <Blueprint />
    </>
  );
}

export default App;