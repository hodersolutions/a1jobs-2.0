import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';
import JobList from '../job/JobList';
import SearchJobs from './SearchJobs';

class SearchJobsMain extends Component {
    componentDidMount() {
		window.scrollTo(0, 0);
    }
    
	render() {
		const options = {
			zIndex: 200, top: '50px'
        }
		return (
            <Fragment>
                <Notifications options={{ options }}/>
                <div className='search-jobs'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center underline'>
                            <div className='col-md-12'>
                                <h1 className='font-weight-bold'>Search a Job</h1>                                    
                            </div>
                        </div>
                        <div className='row align-items-center justify-content-center'>
                        <div className='col-md-12'>
                            <SearchJobs />    
                        </div>
                        </div>
                    </div>
                    <JobList />
                </div>
            </Fragment>
        )				
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user,
        job: state.job	
	}
};

export default connect(mapStateToProps, null)(SearchJobsMain);