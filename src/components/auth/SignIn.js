import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Loading from '../common/loading/Loading';
import Notifications, { notify } from 'react-notify-toast';
import { isEmail, isMobilePhone } from 'validator';
import { connect } from 'react-redux';
import { authenticateUser, resetError } from '../../store/actions/userActions';

class SignIn extends Component {	
    constructor() {
		super();		
		this.state = {
			loginId: '',						
			password: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value			
		});		
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let errors = "";
		if (!isEmail(this.state.loginId) && !isMobilePhone(this.state.loginId, 'en-IN'))
			errors = "Please provide a valid Email or Mobile";

        if(errors === "")
			this.props.authenticateUser(this.state);
        else
            notify.show(errors, 'error', 3000, 'red');				
	}
    render() {
		const options = {
			zIndex: 200, top: '50px'
		}		
		if(this.props.user.is_authenticated === true) {
			return (
				<Redirect to='/'/>
			)
		}
		else if(this.props.user.status === 'AUTHENTICATE_USER_ERROR') {
			notify.show(this.props.user.response.data['message'], 'error', 3000, 'red');
			this.props.resetError();			
		}
		return (
			<div>
				<div className="container" id="signInContainer">
					<Notifications options={{ options }}/>
					{ this.props.user.loading ? <Loading /> :
						<div className="wrap-login-style">
							<form method="POST" action="" onSubmit={this.handleSubmit} className="form-signin">
								<fieldset className="form-group">
									<img className="mb-3" src={require("../../static/images/login.png")} alt="Login" width="60" height="60"/>
									<h1 className="border-bottom mb-4 h3 mb-3 font-weight-normal">Please sign in</h1>
									<div className="form-group">
										<label className="form-control-label" htmlFor="email">Email / Mobile</label>
										<input className="form-control form-control-sm" id="loginId" name="loginId" required="" type="text" autoComplete="email-mobile" value={this.state.email} onChange={this.handleChange}/>
									</div>
									<div className="form-group">
										<label className="form-control-label" htmlFor="password">Password</label>
										<input className="form-control form-control-sm" id="password" name="password" required="" type="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange}/>
									</div>								
								</fieldset>
								<div className="form-group">
									<input className="btn btn-md btn-primary btn-block" id="submit" name="submit" type="submit" value="Sign In"/>
								</div>
								<Link to="/forgot" id="forgot">Forgot your password?</Link>
								<br/>
								<br/>
								<label id="notaMember">Not a member?&nbsp;<Link to="/signup" id="signUp">Join Us</Link></label>
							</form>
						</div>
					}
				</div>					
			</div>
		)			
    }
}

const mapStateToProps = (state, props) => {
	return {
		user: state.user	
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
		authenticateUser: (user) => dispatch(authenticateUser(user)),
		resetError: () => dispatch(resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
