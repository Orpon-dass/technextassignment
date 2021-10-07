import React from 'react'

export default function Blueprint({apiData}) {
    return (
        <div className="container-fluid">
             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4" >
                {
                 apiData.map((data)=>
            
                 <div className="col mt-3 mb-3 d-flex justify-content-center">
                        <div className="card" style={{"width": "19rem"}}>
                            <div className="text-center">
                              <img src="https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png" className="card-img-top" style={{width:"170px"}} alt="..." />
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">FalconSat</h5>
                                <p className="card-text">Engine failure at 33 seconds and loss of vehicle
                                <a href="#" className="card-link ms-1">See Details</a>
                                </p>
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Mission Name : FalconSat</li>
                                <li className="list-group-item">Rocket Name : Falcon 1</li>
                                <li className="list-group-item">Customers : DARPA</li>
                                <li className="list-group-item">Nationality : United States</li>
                            </ul>

                            <div className="card-body d-flex justify-content-between">
                                  <button type="button" class="btn btn-info">Video</button>
                                  <div className="bg-danger pt-2 pb-2 ps-3 pe-3 rounded">Fail</div>
                            </div>
                            <div class="card-footer">
                               <small class="text-muted">launch year 2006-03-24</small>
                            </div>
                        </div>
                 </div>
                 )}

             </div>
        </div>
    )
}
