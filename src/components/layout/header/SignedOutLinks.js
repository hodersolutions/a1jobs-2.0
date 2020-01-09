import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
      	<Fragment>					
			<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
				<Link to="/signup" className="btn btn-success border-width-2 d-lg-inline-block join-us-link"><span className="mr-2 icon-person_add"></span>Join Us</Link>
			</li>
			<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
				<Link to="/signin" className="btn btn-primary border-width-2 d-lg-inline-block sign-in-link"><span className="mr-2 icon-sign-in"></span>Sign In</Link>
			</li>
		</Fragment>
    )
}

export default SignedOutLinks;