import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import Banner from "../common/Banner";
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
					<Banner banner="Sign In" />
					<div className="site-section" id="next-section">
					<Notifications options={{ options }}/>
						<div className="container">
							<div className="row">
								<div className="col-lg-8 mb-7 mb-lg-2">
									<form method="POST" action="" onSubmit={this.handleSubmit}>
										<div className="row form-group">
											<div className="col-md-6 mb-3 mb-md-0">
												<label className="text-black" htmlFor="email">Email Address</label>
												<input className="form-control" id="email" name="email" required="" type="text" autoComplete="username-email" value={this.state.email} onChange={this.handleChange}/>
											</div>
											<div className="col-md-6 mb-3 mb-md-0">
												<label className="text-black" htmlFor="password">Password</label>
												<input className="form-control" id="password" name="password" required="" type="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange}/>
											</div>
											<div className="col-md-6 mb-3 mb-md-0">
												<input className="btn btn-md btn-primary btn-block" id="submit" name="submit" type="submit" value="Sign In"/>
												<br/><a href="/forgot" id="forgot">Forgot your password?</a>
												<br/><label id="notaMember">Not a member?&nbsp;<a href="/signup" id="signUp">Join Us</a></label>   
                                			</div>                            															
										</div>
									</form>
								</div>
							</div>
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
