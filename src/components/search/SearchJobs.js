import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import { authenticateUser } from '../../store/actions/userActions';
import JobList from '../job/JobList';

class SearchJobs extends Component {	
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
				<Fragment>
                    <Notifications options={{ options }}/>
					<div className="search-jobs">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                            <div className="col-md-12">                                
                                <form method="post" className="search-jobs-form">
                                    <div className="row mb-5">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                            <input type="text" className="form-control form-control-lg" placeholder="Job title, keywords..."/>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                            <select className="form-control form-control-lg">
                                                <option>Anywhere</option>
                                                <option>San Francisco</option>
                                                <option>Palo Alto</option>
                                                <option>New York</option>
                                                <option>Manhattan</option>
                                                <option>Ontario</option>
                                                <option>Toronto</option>
                                                <option>Kansas</option>
                                                <option>Mountain View</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                            <select className="form-control form-control-lg">
                                                <option>Part Time</option>
                                                <option>Full Time</option>
                                                <option>Freelancer</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                            <button type="submit" className="btn btn-primary btn-block text-white btn-search"><span className="icon-search icon mr-2"></span>Search Job</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        <JobList />
                    </div>
				</Fragment>
			)
		}		
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user,
        job: state.job	
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateUser: (user) => dispatch(authenticateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobs);