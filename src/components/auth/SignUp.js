import React, { Component, Fragment } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import {Link} from 'react-router-dom';
import { isEmail, isMobilePhone } from 'validator';
import { connect } from 'react-redux';
import { createUser, resetUserStatus } from '../../store/actions/userActions';
import { CREATE_USER_SUCCESS, CREATE_USER_ERROR } from '../../store/types/userTypes';

class SignUp extends Component {    
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            mobile: '',
            password: '',
            confirm_password: '',
            is_recruiter: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    resetState = () => {
        this.setState({
            email: '',
            mobile: '',
            password: '',
            confirm_password: '',
            is_recruiter: false
        });
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    handleRecruiterChecked = (e) => {
        this.setState({
          [e.target.name]: e.target.checked
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = '';
        if (!isEmail(this.state.email))
            errors += 'Invalid Email address';        
        else if (!isMobilePhone(this.state.mobile, 'en-IN'))
            errors += 'Invalid Mobile number';        
        if(errors === '') {
            this.props.createUser(this.state);
            this.resetState();
        }
        else
            notify.show(errors, 'error', 3000, 'red');
    }

    render() {
        const options = {
			zIndex: 200, top: '50px'
        }
        const check = {
            verticalAlign: 'middle',
            marginLeft: '10px'
        }
        if (this.props.user.status === CREATE_USER_SUCCESS) {
            notify.show(this.props.user.response.message + ', please Sign In.', 'success', 5000, 'green');
            this.props.resetUserStatus();
        }
        else if(this.props.user.status === CREATE_USER_ERROR) {
            notify.show(this.props.user.response.message, 'error', 5000, 'red');
            this.props.resetUserStatus();
        }        
        return (
            <div>
                <Notifications options={{ options }}/>
                <div className='container' id='signUpContainer'>
                    <div className='wrap-login-style'>
                        <form method='POST' onSubmit={this.handleSubmit} className='form-signin'>
                            <fieldset className='form-group'>                            
                                { 
                                    this.props.common.loading ?
                                    (
                                        <Fragment>
                                            <img
                                                className='mb-3'
                                                src={require('../../static/images/loading/loading_gear.gif')}
                                                alt='Sign Up'
                                                width='60'
                                                height='60'
                                            />
                                            <h1 className='border-bottom mb-4 h3 mb-3 font-weight-normal'>Registering User</h1>
                                        </Fragment>
                                    ) 
                                    :
                                    (
                                        <Fragment>
                                            <img
                                                className='mb-3'
                                                src={require('../../static/images/signup.png')}
                                                alt='Sign Up'
                                                width='60'
                                                height='60'
                                            />
                                            <h1 className='border-bottom mb-4 h3 mb-3 font-weight-normal'>Join Us</h1>
                                        </Fragment>
                                    )
                                }     
                                <div className='form-group'>
                                    <label className='form-control-label' htmlFor='email'>Email</label>
                                    <input
                                        className='form-control form-control-lg'
                                        id='email'
                                        name='email'
                                        required=''
                                        type='text'
                                        autoComplete='email'
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='form-control-label' htmlFor='mobile'>Mobile</label>
                                    <input
                                        className='form-control form-control-lg'
                                        id='mobile'
                                        name='mobile'
                                        required=''
                                        type='text'
                                        autoComplete='mobile'
                                        onChange={this.handleChange}
                                        value={this.state.mobile}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='form-control-label' htmlFor='password'>Password</label>
                                    <input
                                        className='form-control form-control-lg'
                                        id='password'
                                        name='password'
                                        required=''
                                        type='password'
                                        autoComplete='new-password'
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        />
                                </div>
                                <div className='form-group'>
                                    <label className='form-control-label' htmlFor='confirm_password'>Confirm Password</label>
                                    <input
                                        className='form-control form-control-lg'
                                        id='confirm_password'
                                        name='confirm_password'
                                        required=''
                                        type='password'
                                        autoComplete='new-password'
                                        onChange={this.handleChange}
                                        value={this.state.confirm_password}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='confirm_password'>Are you a Recruiter</label>
                                    <input
                                        style={check}                                        
                                        id='is_recruiter'
                                        name='is_recruiter'
                                        required=''
                                        type='checkbox'
                                        onChange={this.handleRecruiterChecked}
                                        value={this.state.is_recruiter}
                                    />
                                </div>
                            </fieldset>
                            <div className='form-group'>
                                <input
                                    className='btn btn-md btn-primary btn-block'
                                    id='submit'
                                    name='submit'
                                    type='submit'
                                    value='Sign Up'
                                />
                            </div>
                        </form>
                        <label id='alreadyaMember'>
                            Already a member?&nbsp;
                            <Link to='/signin' id='signIn'>Sign In</Link>
                        </label>
                    </div>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {    	
        user: state.user,
        common: state.common
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user)),
        resetUserStatus: () => dispatch(resetUserStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
