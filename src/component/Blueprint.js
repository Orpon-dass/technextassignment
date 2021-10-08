import React from 'react';
import { useSelector } from 'react-redux';
import rocketImage from '../image/Rocket.jpg';

export default function Blueprint() {
    // redux code
    const apiData = useSelector((state) => state.api_data);
    const bottom = useSelector((state) => state.bottomfun);
    return (
        <div className="container-fluid">
            {apiData.length !== 0 && (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {apiData.map((data) => (
                        <div
                            key={data.flight_number}
                            className="col mt-3 mb-3 d-flex justify-content-center"
                        >
                            <div className="card shadow" style={{ width: '19rem' }}>
                                <div className="text-center mt-2">
                                    <img
                                        src={
                                            data.links.mission_patch === null
                                                ? rocketImage
                                                : data.links.mission_patch
                                        }
                                        className="card-img-top"
                                        style={{ width: '170px' }}
                                        alt="..."
                                    />
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">{data.mission_name}</h5>
                                    <p className="card-text">
                                        {data.details !== null
                                            ? data.details.slice(0, 100)
                                            : 'details not available'}
                                        <a
                                            href={data.links.article_link}
                                            className={
                                                data.details === null
                                                    ? 'card-link ms-1 btn disabled'
                                                    : 'card-link ms-1'
                                            }
                                        >
                                            See Details
                                        </a>
                                    </p>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        Rocket Name : {data.rocket.rocket_name}
                                    </li>
                                    <li className="list-group-item">
                                        Customers :{' '}
                                        {data.rocket.second_stage.payloads[0].customers[0]}{' '}
                                    </li>
                                    <li className="list-group-item">
                                        Nationality :{' '}
                                        {data.rocket.second_stage.payloads[0].nationality}
                                    </li>
                                    <li
                                        className={
                                            data.launch_success === false
                                                ? 'list-group-item bg-danger'
                                                : 'list-group-item bg-success'
                                        }
                                    >
                                        Mission :{' '}
                                        {data.launch_success === false ? 'Fail' : 'Successful'}
                                    </li>
                                </ul>
                                <a href={data.links.video_link}>
                                    <div className="d-grid gap-2 m-2">
                                        <button className="btn btn-primary" type="button">
                                            Video Link
                                        </button>
                                    </div>
                                </a>
                                <div className="card-footer">
                                    <small className="text-muted">
                                        launch year {data.launch_year}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {bottom && (
                <div className="row">
                    <div className="col">
                        <h5 className="text-center">No more post</h5>
                    </div>
                </div>
            )}
            {apiData.length === 0 && (
                <div className="row">
                    <div className="col">
                        <h5 className="text-center mt-4">Nothing found</h5>
                    </div>
                </div>
            )}
        </div>
    );
}
