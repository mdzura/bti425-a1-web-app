import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class VehicleList extends Component {
  // Class properties 

  state = { vehicles: [] };

  url = "https://bti425-a1-web-api.herokuapp.com/api/vehicles/";

  componentDidMount() {

    // Get all
    fetch(this.url)
      .then(function(response) {
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
      .then(function(responseData) {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ vehicles: responseData.data });
        // Optional...
        console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Vehicle List';

    return (
      <div>
        <h4>List of Vehicles, from the reqres.in service</h4>
        <p><Link className='btn btn-default' to='/users/create'>Add a New Vehicle</Link></p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody vehicles={this.state.vehicles} />
        </table>
      </div>
    );
  }
}

// ############################################################
// Most of the following was copied from the react-tania-updated code example
// ############################################################

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Photo</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>MSRP</th>
      </tr>
    </thead>
  );
}

// Function component
// Its purpose is to render the HTML table body element
const TableBody = (props) => {

  // Using the array of objects, create a new array of React elements
  if (props.vehicles) {
    var rows = props.vehicles.map(function (vehicle, index) {
      return (
        <TableRow vehicle={vehicle} key={index} />
      );
    });
  }
  

  return <tbody>{rows}</tbody>
}

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {

  // For coding convenience (below), create a very short variable name
  const v = props.vehicle;

  // Alternative declaration syntax...
  //const { v } = this.props;

  // Render the row
  return (
    <tr>
      <td>{v.id}</td>
      <td><img src={v.avatar} alt='' className='imgInTable' /></td>
      <td>{v.make}</td>
      <td>{v.model}</td>
      <td>{v.colour}</td>
      <td>{v.model}</td>
      <td>{v.msrp}</td>
      <td><Link className='btn btn-default' to={`/vehicles/detail/${v.id}`}>Details</Link>&nbsp;&nbsp;
          <Link className='btn btn-warning' to={`/vehicles/edit/${v.id}`}>Edit</Link>&nbsp;&nbsp;
          <Link className='btn btn-danger' to={`/vehicles/delete/${v.id}`}>Delete</Link></td>
    </tr>
  );
}

export default VehicleList