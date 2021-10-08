import React from 'react';
import { useDispatch } from 'react-redux';
import { searchAction } from '../actions/Action';

export default function Navbar({
    lastYearData,
    lastMonthData,
    lastweekData,
    isUpcoming,
    fetchData,
    successfulMission,
    failMission,
}) {
    const dispatch = useDispatch();
    const searchHandler = (e) => {
        dispatch(searchAction(e.target.value));
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h3 onClick={fetchData} className="navbar-brand" style={{ cursor: 'pointer' }}>
                        SpaceX launches
                    </h3>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-2">
                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Filter
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={lastweekData}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Last Week
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={lastMonthData}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Last Month
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={lastYearData}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Last Year
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={isUpcoming}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Is Upcoming
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={successfulMission}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Successful mission
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="dropdown-item"
                                            onClick={failMission}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Fail Mission
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={searchHandler}
                            />
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
