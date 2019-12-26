import React, { Fragment } from 'react';
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
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top banner-gradient-royal-bottom">
			<Link to="/" className="site-logo">
				<img
					src={require("../../../static/images/logo/site-logo.png")}
					alt="A1JOBS"
					className="logo"
				/> 
				{/* <span className="app-name">A1JOBS</span> */}
			</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse main-menu" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto main-header-ul">
					<li data-toggle="collapse" data-target=".navbar-collapse.show">
						<Link to="/searchjobs" className="nav-item nav-link">Search Jobs</Link>
					</li>
					<li data-toggle="collapse" data-target=".navbar-collapse.show">
						<Link to="/searchprofiles" className="nav-item nav-link">Search Profiles</Link>
					</li>
					<li data-toggle="collapse" data-target=".navbar-collapse.show">
						<Link to="/contact" className="nav-item nav-link">Contact Us</Link>
					</li>						
				</ul>
				<form className="form-inline my-2 my-lg-0">
					{ userOptions }
				</form>					
			</div>
		</nav>        
      </Fragment>
    );
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, null)(Header);