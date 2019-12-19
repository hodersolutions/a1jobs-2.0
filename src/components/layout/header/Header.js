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
			<div className="site-mobile-menu site-navbar-target">
				<div className="site-mobile-menu-header">
					<div className="site-mobile-menu-close mt-3">
						<span className="icon-close2 js-menu-toggle"></span>
					</div>
				</div>
				<div className="site-mobile-menu-body"></div>
			</div>
			<header className="site-navbar mt-3">
				<div className="container-fluid">
					<div className="row align-items-center">
					<div className="site-logo col-6"><Link to="/"><img alt="logo" className='page-logo' src={ require('../../../static/images/logo/logo.png') } />A1JOBS</Link></div>

					<nav className="mx-auto site-navigation">
						<ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
						<li><Link to="/" className="nav-link header-link">Home</Link></li>
						<li><Link to="/searchjobs" className="nav-link header-link">Search Jobs</Link></li>
						<li><Link to="/" className="nav-link header-link">Search Profiles</Link></li>
						<li><Link to="/contact" className="nav-link header-link">Contact us</Link></li>
						<li><Link to="/about" className="nav-link header-link">About us</Link></li>
						</ul>
					</nav>
					
					<div className="right-cta-menu text-right d-flex aligin-items-center col-6">
						<div className="ml-auto">
							<Link to="/" className="btn btn-success border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-person_add"></span>Join Us</Link>
							<span>&nbsp;&nbsp;</span>
							<Link to="/signin" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-sign-in"></span>Sign In</Link>
						</div>
						<Link to="/" className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span className="icon-menu h3 m-0 p-0 mt-2"></span></Link>
					</div>

					</div>
				</div>
			</header>
		</div>
    );
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, null)(Header);