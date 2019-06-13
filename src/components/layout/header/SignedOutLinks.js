import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
      	<div className="collapse navbar-collapse" id="navbarsOptions">
			<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to="/signin" className="nav-item nav-link">                    
				<span className="icon-text">LOGIN</span>
				</Link>
			</li>
			<li className="nav-item border-button">
				<Link to="/signup" className="nav-item nav-link">                    
				<span className="icon-text">JOIN US</span>
				</Link>
			</li>
			</ul>
		</div>
    )
}

export default SignedOutLinks;