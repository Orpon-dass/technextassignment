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
    if(page===15){
      dispatch(isBottom(true));
    }
     
}, [page]);
//search by rocket name
const searchvalue= useSelector((state)=>state.searchFun);

useEffect(() => {
  const searchByRocketName = (search_value)=>{
    const finalSearchValuev = apiData.filter((data)=>{
         return data.rocket.rocket_name.toString().toLowerCase().includes(search_value.toString().toLowerCase())  
    });
    dispatch(setapidata(finalSearchValuev))
  }
  searchByRocketName(searchvalue)
}, [searchvalue])
// getting last year data
const lastYearData = ()=>{
  const current_date = new Date();
  const d=current_date.getFullYear()-1;
  const getlastyeardata = apiData.filter((data)=>{
         return data.launch_year===d.toString()
  });
  dispatch(setapidata(getlastyeardata))
}
const lastMonthData =()=>{
  const current_date = new Date();
  const cmonth =current_date.getMonth();
  const cdate =current_date.getDate();
  const cyear =current_date.getFullYear();
  const cfulldate = `${cyear}-${cmonth-1}-${cdate}`;
  const getlastMothdata = apiData.filter((val)=>{
  const lanchdate= new Date(val.launch_date_local)
  const lmonth =lanchdate.getMonth();
  const ldate =lanchdate.getDate();
  const lyear =lanchdate.getFullYear();
  const lfulldate= `${lyear}-${lmonth}-${ldate}`;
    // console.log(lfulldate)
    return lfulldate.toString()===cfulldate.toString()
  });
  //console.log(getlastMothdata);
  dispatch(setapidata(getlastMothdata));
}

//get last week data
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return [d.getUTCFullYear(), weekNo];
}
// console.log(`week ${weeknum[1]} year ${weeknum[0]} `)
const lastweekData =()=>{
  const current_weeknum = getWeekNumber(new Date());

  const getLastWeekData = apiData.filter((result)=>{
  const lanchdate= new Date(result.launch_date_local)
  const lmonth =lanchdate.getMonth();
  const ldate =lanchdate.getDate();
  const lyear =lanchdate.getFullYear();
  const lfulldate= `${lyear}-${lmonth}-${ldate}`;
  const apiWeekNum =getWeekNumber(new Date(lfulldate));
    return apiWeekNum[1]===current_weeknum -1 && apiWeekNum[0]===current_weeknum[0]
  //console.log(` api week ${apiWeekNum[1]} api year ${apiWeekNum[0]} `)
  });
  //console.log(getLastWeekData);
  dispatch(setapidata(getLastWeekData));

}
const isUpcoming =()=>{
  const getIsupComingData = apiData.filter((upcomingData)=>{
     return upcomingData.upcoming===true;
  });
  //console.log(getIsupComingData);
  dispatch(setapidata(getIsupComingData));

}
  return (
    <>
    <Navbar isUpcoming={isUpcoming} lastYearData={lastYearData} lastMonthData={lastMonthData} lastweekData={lastweekData}/>
    <Blueprint />
    </>
  );
}

export default App;