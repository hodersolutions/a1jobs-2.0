import React, { Component, Fragment } from 'react';
import { notify } from 'react-notify-toast';
import {Link} from 'react-router-dom';
import { isEmail, isMobilePhone } from 'validator';
import { connect } from 'react-redux';
import UserAPI from '../../api/UserAPI';
import { NotificationsTimeOut } from '../common/Constants';

class SignUp extends Component {    
    constructor(props) {
        super(props);
        this.api = null;
        this.state = {
            user: {
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
                is_recruiter: false
            },
            loading: false            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    resetState = () => {
        this.setState({
            user: {
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
                is_recruiter: false
            },
            loading: false
        });
        if(this.refs['is_recruiter'].checked)
            this.refs['is_recruiter'].checked = !this.refs['is_recruiter'].checked;
    }

    handleChange = (e) => {
		this.setState({ user: {...this.state.user, [e.target.name]: e.target.value} })		
    }
    
    handleRecruiterChecked = (e) => {
        this.setState({ user: {...this.state.user, [e.target.name]: e.target.checked} });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let errors = '';
        if (!isEmail(this.state.user.email))
            errors += 'Invalid Email address';        
        else if (!isMobilePhone(this.state.user.mobile, 'en-IN'))
            errors += 'Invalid Mobile number';
        else if (this.state.user.password !== this.state.user.confirm_password)
            errors += 'Passwords do not match';
        if(errors === '') {
            this.api = new UserAPI();
            this.setState({
				loading: true
			});
            await this.api.createUser(this.state.user, {mode: 'cors'})
            .then(response => {
                    if(response.status === 'success') {
                        notify.show(response.message + '. Please Sign In.', 'success', NotificationsTimeOut, 'green');
                    }
                    else {
                        notify.show(response.message, 'error', NotificationsTimeOut, 'red');
                    }
                    this.setState({
                        loading: false
                    });
                }
            );
            this.resetState();
        }
        else
            notify.show(errors, 'error', NotificationsTimeOut, 'red');
    }

    render() {        
        const check = {
            verticalAlign: 'middle',
            marginLeft: '10px'
        }
        return (
            <Fragment>
                <div className='container auth-container site-content'>
                    <div className='wrap-login-style'>
                        <form method='POST' onSubmit={this.handleSubmit} className='form-signin'>
                            <fieldset className='form-group'>                            
                                { 
                                    this.state.loading ?
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
                                        value={this.state.user.email}
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
                                        value={this.state.user.mobile}
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
                                        value={this.state.user.password}
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
                                        value={this.state.user.confirm_password}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='is_recruiter'>Are you a Recruiter</label>
                                    <input
                                        style={check}                                        
                                        id='is_recruiter'
                                        name='is_recruiter'
                                        required=''
                                        type='checkbox'
                                        ref='is_recruiter'
                                        onChange={this.handleRecruiterChecked}
                                        value={this.state.user.is_recruiter}
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
	return {    	
        user: state.user,
        common: state.common
	}
}

export default connect(mapStateToProps)(SignUp);
