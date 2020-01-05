import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchJob } from '../../store/actions/searchActions';

class SearchJobs extends Component {	
    constructor() {
		super();		
		this.state = {
			searchToken: ''			
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
		this.props.searchJob(this.state);
	}
    render() {	
        return (
            <Fragment>
                <form method="post" className="search-jobs-form">
                    <div className="row mb-5">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <input type="text" id="searchToken" name="searchToken" className="form-control" placeholder="Job title, keywords..."/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <select className="form-control">
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
                            <select className="form-control">
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
            </Fragment>
        )				
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user,
        job: state.job,
        search: state.search	
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchJob: (user) => dispatch(searchJob(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobs);