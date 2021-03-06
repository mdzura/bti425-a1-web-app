import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

/****************************************************************************
 * DelVehicle: This is the component for handling everything related to     *
 * deleting a record. App() calls this component with a Route.              *
 * **************************************************************************/
class DelVehicle extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = { vehicles: {}, httpStatusCode: 0, httpStatus: false };
    
    url = `https://bti425-a1-web-api.herokuapp.com/api/vehicles/${this.props.id}`;
    //url = `http://localhost:8080/api/vehicles/${this.props.id}`;

    componentDidMount() {

        // Get all
        fetch(this.url)
            .then(response => {
                // Optional...
                this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
                if (response.ok) {
                    // Parse the response body as JSON
                    return response.json();
                } else if (response.status === 404) {
                    // Not found 
                    throw Error('HTTP 404, Not found');
                } else {
                    // Some other situation
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                }
            })
            .then(responseData => {
                // "responseData" is an object; here, we're interested in its "data" property
                // Study the shape of the data in the reqres.in service
                this.setState({ vehicles: responseData });
                // Optional...
                //console.log(responseData.data);
            })
            .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error);
            });

    }

// *************************** This controls the page render ************************************//
    handleSubmit(e) {

        // Delete
        fetch(this.url, { method: 'DELETE'})
            .then(response => {
                console.log("Submit: " + JSON.stringify(response));
                if (response.ok) {
                    // Parse the response body as JSON
                    return response.status;
                } else if (response.status >= 400 && response.status < 500) {
                    // Error caused by the requestor
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                } else {
                    // Some other situation
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                }
            })
            .then(responseData => {
                // "responseData" is an integer (probably 204)
                // Study the shape of the data in the reqres.in service
                // Optional...
                console.log(responseData);
                // Redirect
                this.props.history.push('/vehicles');
            })
            .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error)
            });
    }

// *************************** This controls the page render ************************************//
    render() {
        document.title = `Delete Vehicle ${this.props._id}`;

        const v = this.state.vehicles;

        return (
            <div>
                <h4>Delete Vehicle #{v._id} - {v.make} {v.model} (VIN:{v.vin}) from Database</h4>

                {this.state.httpStatusOk ? (
                    <div className="row">
                        <div className="col-md-6">
                            <dl className="dl-horizontal">
                                <dt>Make</dt><dd>{v.make}</dd>
                                <dt>Model</dt><dd>{v.model}</dd>
                                <dt>Colour</dt><dd>{v.colour}</dd>
                                <dt>Year</dt><dd>{v.year}</dd>
                                <dt>VIN</dt><dd>{v.vin}</dd>
                                <dt>MSRP</dt><dd>${v.msrp}</dd>
                                <dt>Description</dt><dd>{v.description}</dd>
                                <br />
                                <dt>Purchaser Name</dt><dd>{v.purchaserName}</dd>
                                <dt>Purchaser Email</dt><dd>{v.purchaserEmail}</dd>
                                <dt>Purchase Date</dt><dd>{v.purchaseDate}</dd>
                                <dt>Price Paid</dt><dd>{v.pricePaid}</dd>
                            </dl>
                        </div>
                        <div className="col-md-2">
                            <img src={v.photo} alt="" className="img-responsive" />
                        </div>
                    </div>

                ) : (
                        <p>Requested Vehicle was not found</p>
                    )}

                <hr />
                <p>Confirm that this Vehicle should be deleted, or cancel to return to the list of Vehicles</p>
                <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm Delete</button>&nbsp;&nbsp;
                <Link className='btn btn-default' to='/vehicles'>Cancel</Link></p>
            </div>
        );
    }
}

export default withRouter(DelVehicle);