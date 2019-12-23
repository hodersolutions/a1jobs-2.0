import React from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const Header = (props) => {
	let userOptions;
	if (props.user.is_authenticated === true) {
		userOptions = <SignedInLinks />
	}
	else {
		userOptions = <SignedOutLinks />
	}
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src={require("../../../static/images/logo/logo.png")}
                alt="A1JOBS"
                className="logo"
              /> <span className="app-name">A1JOBS</span>
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/searchjobs" className="nav-item nav-link">                    
                  <span className="icon-text">Search Jobs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/searchprofiles" className="nav-item nav-link">                    
                  <span className="icon-text">Search Profiles</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-item nav-link">                    
                  <span className="icon-text">Contact Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-item nav-link">                    
                  <span className="icon-text">About Us</span>
                </Link>
              </li>
            </ul>            
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsOptions"
              aria-controls="navbarsOptions"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            { userOptions }
          </div>
        </nav>
      </div>
    );
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, null)(Header);