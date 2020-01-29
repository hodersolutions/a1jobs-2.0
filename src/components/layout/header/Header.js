import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const Header = (props) => {
	let userOptions;
	let postJob = <li data-toggle='collapse' data-target='.navbar-collapse.show'>
					<Link to='/job' className='nav-item btn btn-post border-width-2 d-lg-inline-block job-post-link'><span className='mr-2 icon-near_me'></span>Post a Job</Link>
				</li>;
	let searchProfile = '';
	if (props.user.logged_user !== null) {
		userOptions = <SignedInLinks />
		if(!props.user.logged_user.is_recruiter)
			postJob = '';
		else
			searchProfile = <li data-toggle='collapse' data-target='.navbar-collapse.show'>
								<Link to='/profiles' className='nav-item nav-link nav-link-ltr'>Search Profiles</Link>
							</li>
	}
	else
		userOptions = <SignedOutLinks />	
    return (
      <Fragment>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top banner-gradient-royal-bottom'>
			<Link to='/' className='site-logo'>
				<img
					src={require('../../../static/images/logo/site-logo.png')}
					alt='A1JOBS'
					className='logo'
				/> 
				<span className='app-name'>A1JOBS</span>
			</Link>
			<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse main-menu' id='navbarSupportedContent'>
				<ul className='navbar-nav mr-auto main-header-ul'>
					<li data-toggle='collapse' data-target='.navbar-collapse.show'>
						<Link to='/jobs' className='nav-item nav-link nav-link-ltr'>Search Jobs</Link>
					</li>
					{ searchProfile }
					<li data-toggle='collapse' data-target='.navbar-collapse.show'>
						<Link to='/contact' className='nav-item nav-link nav-link-ltr'>Contact Us</Link>
					</li>
				</ul>
				<ul className='navbar-nav'>
					{ postJob }					
					{ userOptions }
				</ul>									
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