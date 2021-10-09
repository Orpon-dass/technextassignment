import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBottom, setapidata } from './actions/Action';
import Blueprint from './component/Blueprint';
import Navbar from './component/Navbar';

function App() {
    const [apiData, setApiData] = useState([]);
    const [page, setpage] = useState(1);
    const [pagedata, setPagedata] = useState([]);
    // redux code
    const dispatch = useDispatch();
    // fetch api
    const fetchData = async () => {
        const data = await fetch('https://api.spacexdata.com/v3/launches');
        const apiResult = await data.json();
        setApiData((apiData) => [...apiData, ...apiResult]);
        dispatch(setapidata(apiResult.slice(0, 8)));
    };
    useEffect(() => {
        fetchData();
    }, []);

    // set page number
    useEffect(() => {
        function handleScroll() {
            const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
            const ScTopCliheight = Math.round(scrollTop + clientHeight + 2);
            if (ScTopCliheight >= scrollHeight) {
                setpage(page + 1);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    useEffect(() => {
        const limit = 8;
        const startIndex = (page - 1) * limit;
        const endEndex = page * limit;
        const perPageData = apiData.slice(startIndex, endEndex);
        if (page < 15) {
            setPagedata((pagedata) => [...pagedata, ...perPageData]);
            dispatch(setapidata(pagedata));
        }
        if (page === 15) {
            dispatch(isBottom(true));
        }
    }, [page]);
    // search by rocket name
    const searchvalue = useSelector((state) => state.searchFun);

    useEffect(() => {
        const searchByRocketName = (searchValue) => {
            const finalSearchValuev = apiData.filter((data) =>
                data.rocket.rocket_name
                    .toString()
                    .toLowerCase()
                    .includes(searchValue.toString().toLowerCase())
            );
            dispatch(setapidata(finalSearchValuev));
        };
        searchByRocketName(searchvalue);
    }, [searchvalue]);
    // getting last year data
    const lastYearData = () => {
        const currentDate = new Date();
        const d = currentDate.getFullYear() - 1;
        const getlastyeardata = apiData.filter((data) => data.launch_year === d.toString());
        dispatch(setapidata(getlastyeardata));
    };
    const lastMonthData = () => {
        const currentDate = new Date();
        const cmonth = currentDate.getMonth();
        const cdate = currentDate.getDate();
        const cyear = currentDate.getFullYear();
        const cfulldate = `${cyear}-${cmonth - 1}-${cdate}`;
        const getlastMothdata = apiData.filter((val) => {
            const lanchdate = new Date(val.launch_date_local);
            const lmonth = lanchdate.getMonth();
            const ldate = lanchdate.getDate();
            const lyear = lanchdate.getFullYear();
            const lfulldate = `${lyear}-${lmonth}-${ldate}`;
            // console.log(lfulldate)
            return lfulldate.toString() === cfulldate.toString();
        });
        // console.log(getlastMothdata);
        dispatch(setapidata(getlastMothdata));
    };

    // get last week data
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return [d.getUTCFullYear(), weekNo];
    }
    // console.log(`week ${weeknum[1]} year ${weeknum[0]} `)
    const lastweekData = () => {
        const currentWeeknum = getWeekNumber(new Date());
        const getLastWeekData = apiData.filter((result) => {
            const lanchdate = new Date(result.launch_date_local);
            const lmonth = lanchdate.getMonth();
            const ldate = lanchdate.getDate();
            const lyear = lanchdate.getFullYear();
            const lfulldate = `${lyear}-${lmonth}-${ldate}`;
            const apiWeekNum = getWeekNumber(new Date(lfulldate));
            return apiWeekNum[1] === currentWeeknum - 1 && apiWeekNum[0] === currentWeeknum[0];
            // console.log(` api week ${apiWeekNum[1]} api year ${apiWeekNum[0]} `)
        });
        // console.log(getLastWeekData);
        dispatch(setapidata(getLastWeekData));
    };
    const isUpcoming = () => {
        const getIsupComingData = apiData.filter((upcomingData) => upcomingData.upcoming === true);
        // console.log(getIsupComingData);
        dispatch(setapidata(getIsupComingData));
    };
    // get seccessful mission  data
    const successfulMission = () => {
        const getSuccessfulMissionData = apiData.filter(
            (succeesdata) => succeesdata.launch_success === true
        );
        dispatch(setapidata(getSuccessfulMissionData));
    };
    // get fail mission data
    const failMission = () => {
        const getfailMissionData = apiData.filter((faildata) => faildata.launch_success === false);
        dispatch(setapidata(getfailMissionData));
    };
    return (
        <>
            <Navbar
                failMission={failMission}
                successfulMission={successfulMission}
                fetchData={fetchData}
                isUpcoming={isUpcoming}
                lastYearData={lastYearData}
                lastMonthData={lastMonthData}
                lastweekData={lastweekData}
            />
            <Blueprint />
        </>
    );
}

export default App;
