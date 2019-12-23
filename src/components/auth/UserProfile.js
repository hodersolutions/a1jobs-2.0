import React, { Component } from 'react';
import './UserProfile.css';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';

class UserProfile extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.current_user.username,
            email: this.props.user.current_user.email,
            password: "",
            confirm_password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();        
        this.props.createUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        const options = {
			zIndex: 200, top: '50px'
		}
        return (
            <div className="container" id="signUpContainer">
                <Notifications options={{ options }}/>
                <div className="wrap-login-style">
                    <form method="POST" onSubmit={this.handleSubmit} className="form-signin">
                        <fieldset className="form-group">
                            <img
                                className="mb-3"
                                src={require("../../static/images/update.png")}
                                alt="Sign Up"
                                width="60"
                                height="60"
                            />
                            <h1 className="border-bottom mb-4 h3 mb-3 font-weight-normal">Update Profile</h1>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="username">Username</label>
                                <br/>                                
                                <label className="form-control-label"><b>{this.state.username}</b></label>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="email">Email</label>
                                <br/>                                
                                <label className="form-control-label"><b>{this.state.email}</b></label>                                
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="password">Password</label>
                                <input
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    required=""
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="confirm_password">Confirm Password</label>
                                <input
                                    className="form-control form-control-lg"
                                    id="confirm_password"
                                    name="confirm_password"
                                    required=""
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={this.handleChange}
                                    value={this.state.confirm_password}
                                />
                            </div>
                        </fieldset>
                        <div className="form-group">
                            <input
                                className="btn btn-md btn-primary btn-block"
                                id="submit"
                                name="submit"
                                type="submit"
                                value="Update Profile"
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {    	
        user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
