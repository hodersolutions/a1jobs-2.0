import React, { Component } from 'react';
import './SignIn.css';
import { Redirect } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/userActions';

class SignIn extends Component {	
    constructor() {
		super();		
		this.state = {
			email: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();		
		this.props.authenticateUser({
			email: this.state.email,
			password: this.state.password
		});
	}
    render() {
		const options = {
			zIndex: 200, top: '50px'
		}		
		if(this.props.user.is_authenticated === true) {
			return <Redirect to='/home'/>;
		}
		else {				
			if(this.props.user.error !== null && this.props.user.error.response.status === 401) {
				notify.show(this.props.user.error.response.data['message'], 'error', 3000, 'red');
				this.props.user.error = null;
			}
			return (
				<div>
					<div className="container" id="signInContainer">
						<Notifications options={{ options }}/>
						<div className="wrap-login-style">
							<form method="POST" action="" onSubmit={this.handleSubmit} className="form-signin">
								<fieldset className="form-group">
									<img className="mb-3" src={require("../../static/images/login.png")} alt="Login" width="60" height="60"/>
									<h1 className="border-bottom mb-4 h3 mb-3 font-weight-normal">Please sign in</h1>
									<div className="form-group">
										<label className="form-control-label" htmlFor="email">Email Address</label>
										<input className="form-control form-control-sm" id="email" name="email" required="" type="text" autoComplete="username-email" value={this.state.email} onChange={this.handleChange}/>
									</div>
									<div className="form-group">
										<label className="form-control-label" htmlFor="password">Password</label>
										<input className="form-control form-control-sm" id="password" name="password" required="" type="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange}/>
									</div>								
								</fieldset>
								<div className="form-group">
									<input className="btn btn-md btn-primary btn-block" id="submit" name="submit" type="submit" value="Sign In"/>
								</div>
								<a href="/forgot" id="forgot">Forgot your password?</a>
								<br/>
								<br/>
								<label id="notaMember">Not a member?&nbsp;<a href="/signup" id="signUp">Join Us</a></label>        
							</form>
						</div>
					</div>
				</div>
			)
		}		
    }
}

const mapStateToProps = (state, props) => {
	return {
		user: state.user	
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateUser: (user) => dispatch(authenticateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
