import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SignedInLinks = (props) => {
    return (
		<div className='login-collapse navbar-collapse'>			
			<li className='nav-item dropdown' data-toggle='collapse' data-target='.navbar-collapse.show'>
				<Link className='nav-link dropdown-toggle welcome-dd' to='' id='welcomeUser' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
					<img src={require('../../../static/images/welcome.png')} className='welcome-icon' alt='welcome'/>
					<span className='welcome-text'>Hi, { props.user.logged_user.email.split('@')[0] }</span>
				</Link>
				<div className='dropdown-menu welcome-options' aria-labelledby='welcomeUser'>
				  {
					props.user.logged_user.is_recruiter ?
					<Link className='dropdown-item' to='/jobs/myposts'>
						<img src={require('../../../static/images/post.png')} className='welcome-icon' data-toggle='collapse' data-target='.navbar-collapse.show' alt='myposts'/>
						<span className='dropdown-text'>My Posts</span>
					</Link>
					:
					<Link className='dropdown-item' to='/jobs/appliedjobs'>
						<img src={require('../../../static/images/post.png')} className='welcome-icon' data-toggle='collapse' data-target='.navbar-collapse.show' alt='myjobs'/>
						<span className='dropdown-text'>My Applied Jobs</span>
					</Link>
				  }
					<Link className='dropdown-item' to='/viewuser'>
						<img src={require('../../../static/images/settings.png')} className='welcome-icon' data-toggle='collapse' data-target='.navbar-collapse.show' alt='profile'/>
						<span className='dropdown-text'>Profile Settings</span>
					</Link>
					<Link className='dropdown-item' to='/signout'>
						<img src={require('../../../static/images/logout.png')} className='welcome-icon' data-toggle='collapse' data-target='.navbar-collapse.show' alt='logout'/>
						<span className='dropdown-text'>Sign Out</span>
					</Link>                                                
				</div>
			</li>			
		</div>      	
    )
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, null)(SignedInLinks);