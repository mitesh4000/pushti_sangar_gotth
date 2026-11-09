import React from 'react'
import { Link } from 'react-router-dom';


const Failure = () => {
   
    return (
        <div className="container">
          <div className="row justify-content-center" style={{marginTop:"245px"}}>
            <div className="col-md-6 text-center">
                <div className="alert alert-danger text-center">
                    <h4 className="alert-heading">Oops, something went wrong!</h4>
                </div>
                <Link to='/'>Back to Home</Link>
            </div>
          </div>
        </div>
      );
}

export default Failure