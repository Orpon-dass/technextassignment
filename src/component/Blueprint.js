import React from 'react';
import { useSelector } from 'react-redux';
import rocketImage from '../image/Rocket.jpg';

export default function Blueprint() {
    // redux code
    const apiDataStoredata = useSelector((state) => state.apidata);
    const apiDataStore = [...new Set(apiDataStoredata)];
    const bottom = useSelector((state) => state.bottomfun);
    return (
        <div className="container-fluid">
            {apiDataStore.length !== 0 && (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {apiDataStore.map((data) => (
                        <div
                            key={data.mission_name}
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
                                    {data.launch_success === false && (
                                        <li className="list-group-item bg-danger">
                                            Mission : {data.launch_success === false && 'Fail'}
                                        </li>
                                    )}
                                    {data.launch_success === true && (
                                        <li className="list-group-item bg-success">
                                            Mission : {data.launch_success === true && 'Successful'}
                                        </li>
                                    )}
                                    {data.launch_success === null && (
                                        <li className="list-group-item bg-warning">
                                            Mission : {data.launch_success === null && 'Pending'}
                                        </li>
                                    )}
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
            {apiDataStore.length === 0 && (
                <div className="row">
                    <div className="col">
                        <h5 className="text-center mt-4">Nothing found</h5>
                    </div>
                </div>
            )}
        </div>
    );
}
